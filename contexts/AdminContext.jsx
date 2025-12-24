'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminAuth, logoutAdmin as logout } from '@/lib/auth'

const AdminContext = createContext()

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const auth = getAdminAuth()
    setAdmin(auth)
    setLoading(false)
  }, [])

  const login = (adminData) => {
    setAdmin(adminData)
  }

  const handleLogout = () => {
    logout()
    setAdmin(null)
    router.push('/admin/login')
  }

  return (
    <AdminContext.Provider value={{ admin, login, logout: handleLogout, loading }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}

