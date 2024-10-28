'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary'
import { useSession } from 'next-auth/react'
import { convertCoordinates } from '@/utils/coordinateUtils'

export default function TravelForm() {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState('')
  const [date, setDate] = useState('')
  const [photo, setPhoto] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!session?.user?.email) {
      setError('You must be signed in to add a travel log.')
      return
    }
    setLoading(true)
    try {
      const convertedCoordinates = convertCoordinates(coordinates)
      if (!convertedCoordinates) {
        throw new Error('Invalid coordinates format. Please use format like "33.9221° S, 18.4231° E"')
      }

      await addDoc(collection(db, 'travels'), {
        title,
        notes,
        location,
        latitude: convertedCoordinates.latitude,
        longitude: convertedCoordinates.longitude,
        date,
        photo,
        userEmail: session.user.email,
      })
      router.push('/travels')
    } catch (error) {
      console.error('Error adding document: ', error)
      setError(error instanceof Error ? error.message : 'An error occurred while adding your travel log. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="title" className="block mb-1 text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="notes" className="block mb-1 text-gray-700">Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border rounded text-gray-900"
        ></textarea>
      </div>
      <div>
        <label htmlFor="location" className="block mb-1 text-gray-700">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="coordinates" className="block mb-1 text-gray-700">Coordinates (e.g., 33.9221° S, 18.4231° E)</label>
        <input
          type="text"
          id="coordinates"
          value={coordinates}
          onChange={(e) => setCoordinates(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="date" className="block mb-1 text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="photo" className="block mb-1 text-gray-700">Photo</label>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onUpload={(result: any) => {
            setPhoto(result.info.secure_url)
          }}
        >
          {({ open }) => {
            return (
              <button type="button" onClick={() => open()} className="bg-blue-500 text-white px-4 py-2 rounded">
                Upload Image
              </button>
            )
          }}
        </CldUploadWidget>
        {photo && <img src={photo} alt="Uploaded" className="mt-2 w-full max-w-xs" />}
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Adding Travel...' : 'Add Travel'}
      </button>
    </form>
  )
}