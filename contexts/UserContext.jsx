'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, logoutUser as logout } from '@/lib/userAuth'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    logout()
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}


