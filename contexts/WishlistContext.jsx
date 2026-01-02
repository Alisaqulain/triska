'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('trisaka_wishlist')
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist))
        } catch (e) {
          console.error('Error loading wishlist:', e)
        }
      }
    }
  }, [])

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist)
    if (typeof window !== 'undefined') {
      localStorage.setItem('trisaka_wishlist', JSON.stringify(newWishlist))
    }
  }

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      saveWishlist([...wishlist, product])
    }
  }

  const removeFromWishlist = (productId) => {
    saveWishlist(wishlist.filter(item => item.id !== productId))
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  const clearWishlist = () => {
    saveWishlist([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}

