'use client'

import {useEffect} from 'react'

export default function BootstrapClient() {
  useEffect(() => {
    // @ts-expect-error bootstrap types not resolved in frontend workspace
    import('bootstrap')
  }, [])

  return null
}