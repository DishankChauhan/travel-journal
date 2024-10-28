'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AuthButton from '@/components/AuthButton'
import { motion } from 'framer-motion'

export default function AnimatedSignInContent() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold mb-4 text-black">Welcome back!</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-black">Welcome to Travel Journal</h1>
        <AuthButton />
      </motion.div>
    </div>
  )
}