import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'
import AnimatedHomeContent from '@/components/AnimatedHomeContent'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  return <AnimatedHomeContent />
}