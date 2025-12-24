'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useUser } from '@/contexts/UserContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { getCartCount } = useCart()
  const { user, logout } = useUser()

  const categories = ['Saree', 'Suit', 'Kurti', 'Accessories']
  const [banarasiOpen, setBanarasiOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur-md border-b border-beige-200 shadow-soft"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="Trisaka Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-serif font-bold text-gray-800">
              Trisaka
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {/* Categories */}
            <div className="flex items-center space-x-6">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${category.toLowerCase()}`}
                  className="text-gray-700 hover:text-gold-500 transition-colors duration-200 font-medium"
                >
                  {category}
                </Link>
              ))}
              
              {/* Banarasi Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setBanarasiOpen(true)}
                onMouseLeave={() => setBanarasiOpen(false)}
              >
                <Link
                  href="/banarasi"
                  className="text-gray-700 hover:text-gold-500 transition-colors duration-200 font-medium flex items-center"
                >
                  Banarasi
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                
                {banarasiOpen && (
                  <>
                    {/* Invisible bridge to prevent gap */}
                    <div className="absolute top-full left-0 w-full h-1" style={{ pointerEvents: 'auto' }} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseEnter={() => setBanarasiOpen(true)}
                      onMouseLeave={() => setBanarasiOpen(false)}
                      className="absolute top-full left-0 pt-1 w-64 z-50"
                    >
                      <div className="bg-white rounded-2xl shadow-elegant p-4">
                      <div className="space-y-2">
                      <Link
                        href="/banarasi/saree"
                        className="block px-4 py-2 rounded-lg hover:bg-cream-50 text-gray-700 hover:text-gold-600 transition-colors"
                      >
                        Banarasi Saree
                      </Link>
                      <Link
                        href="/banarasi/suit"
                        className="block px-4 py-2 rounded-lg hover:bg-cream-50 text-gray-700 hover:text-gold-600 transition-colors"
                      >
                        Banarasi Suit
                      </Link>
                      <Link
                        href="/banarasi/dupatta"
                        className="block px-4 py-2 rounded-lg hover:bg-cream-50 text-gray-700 hover:text-gold-600 transition-colors"
                      >
                        Banarasi Dupatta
                      </Link>
                      <Link
                        href="/banarasi/lehenga"
                        className="block px-4 py-2 rounded-lg hover:bg-cream-50 text-gray-700 hover:text-gold-600 transition-colors"
                      >
                        Banarasi Lehenga
                      </Link>
                      <Link
                        href="/banarasi/other"
                        className="block px-4 py-2 rounded-lg hover:bg-cream-50 text-gray-700 hover:text-gold-600 transition-colors"
                      >
                        Other Banarasi Products
                      </Link>
                      </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 bg-white border border-beige-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-200 text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-700 hover:text-gold-500 transition-colors duration-200"
              aria-label="Wishlist"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gold-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </motion.button>

            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-700 hover:text-gold-500 transition-colors duration-200"
                aria-label="Shopping Cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </motion.button>
            </Link>

            {user ? (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 text-gray-700 hover:text-gold-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </motion.button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 border-b border-beige-200">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <Link href="/track-order" className="block px-4 py-2 text-gray-700 hover:bg-cream-50 rounded-lg">
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        window.location.href = '/'
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-gray-700 hover:text-gold-500 transition-colors font-medium"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-beige-200"
          >
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 bg-white border border-beige-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Mobile Categories */}
              <div className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${category.toLowerCase()}`}
                    className="text-gray-700 hover:text-gold-500 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>

              {/* Mobile Icons */}
              <div className="flex items-center space-x-4 pt-4 border-t border-beige-200">
                <button className="flex items-center space-x-2 text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Wishlist</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Cart</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

