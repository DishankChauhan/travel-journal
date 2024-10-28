'use client'

import { useState, useEffect } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { db } from '@/lib/firebase'
import { collection, query, where, onSnapshot, DocumentData } from 'firebase/firestore'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 0,
  lng: 0
}

export default function TravelMap() {
  const [travels, setTravels] = useState<DocumentData[]>([])
  const [selectedTravel, setSelectedTravel] = useState<DocumentData | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.user?.email) return

    const travelsQuery = query(
      collection(db, 'travels'),
      where('userEmail', '==', session.user.email)
    )

    const unsubscribe = onSnapshot(travelsQuery, (snapshot) => {
      setTravels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })

    return () => unsubscribe()
  }, [session])

  const validTravels = travels.filter(travel => 
    typeof travel.latitude === 'number' && 
    typeof travel.longitude === 'number' &&
    !isNaN(travel.latitude) && 
    !isNaN(travel.longitude)
  )

  if (!session) {
    return <div>Please sign in to view your travel map.</div>
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={2}
    >
      {validTravels.map((travel) => (
        <Marker
          key={travel.id}
          position={{
            lat: travel.latitude,
            lng: travel.longitude
          }}
          onClick={() => setSelectedTravel(travel)}
        />
      ))}

      {selectedTravel && (
        <InfoWindow
          position={{
            lat: selectedTravel.latitude,
            lng: selectedTravel.longitude
          }}
          onCloseClick={() => setSelectedTravel(null)}
        >
          <div>
            <h3>{selectedTravel.title}</h3>
            <p>{selectedTravel.date}</p>
            <Link href={`/travels/${selectedTravel.id}`}>
              View Details
            </Link>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}