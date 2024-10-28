'use client'

import { useEffect, useState } from 'react'
import TravelEditForm from './TravelEditForm'

export default function TravelEditWrapper({ paramId }: { paramId: string }) {
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    const resolveId = async () => {
      const resolvedId = await Promise.resolve(paramId)
      setId(resolvedId)
    }
    resolveId()
  }, [paramId])

  if (!id) {
    return <div>Loading...</div>
  }

  return <TravelEditForm id={id} />
}