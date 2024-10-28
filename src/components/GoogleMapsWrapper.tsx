'use client'

import { ReactNode } from 'react'
import { LoadScript } from '@react-google-maps/api'

export default function GoogleMapsWrapper({ children }: { children: ReactNode }) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      {children}
    </LoadScript>
  )
}