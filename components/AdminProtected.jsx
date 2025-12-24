'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/contexts/AdminContext'

export default function AdminProtected({ children }) {
  const { admin, loading } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !admin) {
      router.push('/admin/login')
    }
  }, [admin, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    )
  }

  if (!admin) {
    return null
  }

  return <>{children}</>
}



