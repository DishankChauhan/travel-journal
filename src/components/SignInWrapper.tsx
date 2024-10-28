'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const AnimatedSignInContent = dynamic(() => import('@/components/AnimatedSignInContent'), { ssr: false })

export default function SignInWrapper() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div>Loading...</div>
  }

  return <AnimatedSignInContent />
}