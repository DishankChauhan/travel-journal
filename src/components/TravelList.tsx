'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function TravelList() {
  const [travels, setTravels] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    async function fetchTravels() {
      if (!session?.user?.email) return

      setLoading(true)
      const travelsQuery = query(
        collection(db, 'travels'),
        where('userEmail', '==', session.user.email)
      )

      try {
        const querySnapshot = await getDocs(travelsQuery)
        const travelData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setTravels(travelData)
      } catch (error) {
        console.error("Error fetching travels: ", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTravels()
  }, [session])

  if (loading) {
    return <div>Loading your travel logs...</div>
  }

  if (!session) {
    return <div>Please sign in to view your travels.</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Travel Logs</h2>
      {travels.length === 0 ? (
        <p>You haven't added any travels yet.</p>
      ) : (
        <ul className="space-y-6">
          {travels.map((travel, index) => (
            <motion.li 
              key={travel.id} 
              className="border p-6 rounded-lg shadow-md bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row items-center">
                {travel.photo && (
                  <div className="mb-4 md:mb-0 md:mr-6 w-full md:w-1/3">
                    <Image 
                      src={travel.photo} 
                      alt={travel.title} 
                      width={300} 
                      height={200} 
                      className="rounded-lg object-cover w-full h-48"
                    />
                  </div>
                )}
                <div className="w-full md:w-2/3">
                  <Link href={`/travels/${travel.id}`} className="text-blue-500 hover:underline">
                    <h3 className="text-xl font-semibold mb-2">{travel.title}</h3>
                  </Link>
                  <p className="text-gray-600 mb-2">{travel.date}</p>
                  <p className="text-gray-600 mb-2">{travel.location}</p>
                  <p className="text-gray-700">{travel.notes && travel.notes.substring(0, 100)}...</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  )
}