'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AnimatedHomeContent() {
  return (
    <div className="text-center">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Your Travel Journal
      </motion.h1>
      <div className="space-x-4 mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link href="/travels" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            View Travels
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link href="/add-travel" className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
            Add New Travel
          </Link>
        </motion.div>
      </div>
    </div>
  )
}