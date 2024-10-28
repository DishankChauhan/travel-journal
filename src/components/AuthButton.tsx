'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AuthButton() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <motion.button 
        onClick={() => signOut({ callbackUrl: '/signin' })} 
        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign out
      </motion.button>
    )
  }
  return (
    <motion.button 
      onClick={() => signIn('google')} 
      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Sign in with Google
    </motion.button>
  )
}