'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary'
import { convertCoordinates } from '@/utils/coordinateUtils'

export default function TravelEditForm({ id }: { id: string }) {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState('')
  const [date, setDate] = useState('')
  const [photo, setPhoto] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchTravel = async () => {
      if (!id) return
      const docRef = doc(db, 'travels', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setTitle(data.title)
        setNotes(data.notes)
        setLocation(data.location)
        setCoordinates(`${Math.abs(data.latitude)}° ${data.latitude >= 0 ? 'N' : 'S'}, ${Math.abs(data.longitude)}° ${data.longitude >= 0 ? 'E' : 'W'}`)
        setDate(data.date)
        setPhoto(data.photo)
      } else {
        console.log('No such document!')
      }
    }

    fetchTravel()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const convertedCoordinates = convertCoordinates(coordinates)
      if (!convertedCoordinates) {
        throw new Error('Invalid coordinates format. Please use format like "33.9221° S, 18.4231° E"')
      }

      await updateDoc(doc(db, 'travels', id), {
        title,
        notes,
        location,
        latitude: convertedCoordinates.latitude,
        longitude: convertedCoordinates.longitude,
        date,
        photo,
      })
      router.push(`/travels/${id}`)
    } catch (error) {
      console.error('Error updating document: ', error)
      setError(error instanceof Error ? error.message : 'An error occurred while updating your travel log. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return
    if (confirm('Are you sure you want to delete this travel entry?')) {
      try {
        await deleteDoc(doc(db, 'travels', id))
        router.push('/travels')
      } catch (error) {
        console.error('Error deleting document: ', error)
      }
    }
  }

  if (!id) {
    return <div>Loading...</div>
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
                Upload New Image
              </button>
            )
          }}
        </CldUploadWidget>
        {photo && (
          <div className="mt-2">
            <img src={photo} alt="Travel" className="w-full max-w-xs rounded" />
          </div>
        )}
      </div>
      <div className="flex space-x-4">
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Travel'}
        </button>
        <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete Travel
        </button>
      </div>
    </form>
  )
}