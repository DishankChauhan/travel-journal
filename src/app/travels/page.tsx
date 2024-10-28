import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import TravelList from '@/components/TravelList'
import TravelMap from '@/components/TravelMap'
import { redirect } from 'next/navigation'

export const revalidate = 0 // disable cache for this page

export default async function Travels() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 overflow-y-auto max-h-[calc(100vh-100px)]">
        <h1 className="text-3xl font-bold mb-4">Your Travels</h1>
        <TravelList />
      </div>
      <div className="md:w-1/2 sticky top-0 h-[calc(100vh-100px)]">
        <TravelMap />
      </div>
    </div>
  )
}