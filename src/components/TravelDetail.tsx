'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'

export default function TravelDetail({ id }: { id: string }) {
  const [travel, setTravel] = useState<any>(null)

  useEffect(() => {
    const fetchTravel = async () => {
      const docRef = doc(db, 'travels', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setTravel({ id: docSnap.id, ...docSnap.data() })
      } else {
        console.log('No such document!')
      }
    }

    fetchTravel()
  }, [id])

  if (!travel) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{travel.title}</h1>
      <p className="text-gray-600 mb-4">{travel.date}</p>
      <p className="mb-4">{travel.notes}</p>
      <p className="mb-4">Location: {travel.location}</p>
      {travel.photo && (
        <div className="mb-4">
          <Image src={travel.photo} alt={travel.title} width={500} height={300} className="rounded" />
        </div>
      )}
      <Link href={`/travels/${id}/edit`} className="bg-blue-500 text-white px-4 py-2 rounded">
        Edit Travel
      </Link>
    </div>
  )
}