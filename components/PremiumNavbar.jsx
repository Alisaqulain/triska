'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useUser } from '@/contexts/UserContext'
import { useWishlist } from '@/contexts/WishlistContext'

export default function PremiumNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [banarasiMegaMenu, setBanarasiMegaMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { getCartCount } = useCart()
  const { user, logout } = useUser()
  const { wishlistCount } = useWishlist()

  const categories = [
    { name: 'BEST SELLERS', href: '/products?sort=bestseller' },
    { name: 'BANARASI SAREES', href: '/banarasi', hasMegaMenu: true },
    { name: 'SAREES', href: '/products?category=saree' },
    { name: 'LEHENGAS', href: '/products?category=lehenga' },
    { name: 'ACCESSORIES', href: '/products?category=accessories' },
    { name: 'OCCASION', href: '/products?occasion=wedding', hasDropdown: true },
    { name: 'COLLECTIONS', href: '/collections' },
    { name: 'FESTIVE SALE', href: '/sale' },
  ]

  const banarasiMegaMenuItems = {
    'Silk Type': ['Katan', 'Organza', 'Tissue', 'Pure Silk', 'Georgette'],
    'Weave': ['Kadhwa', 'Cutwork', 'Jangla', 'Butidar', 'Tanchoi'],
    'Occasion': ['Wedding', 'Festive', 'Party', 'Traditional', 'Bridal'],
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-ivory-50/98 backdrop-blur-md border-b border-maroon-100 shadow-soft"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-14 h-14">
              <Image
                src="/logo.png"
                alt="Trisaka Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-serif font-bold text-maroon-700">
              TRISAKA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => {
                  if (category.hasMegaMenu) setBanarasiMegaMenu(true)
                }}
                onMouseLeave={() => {
                  if (category.hasMegaMenu) setBanarasiMegaMenu(false)
                }}
              >
                <Link
                  href={category.href}
                  className="px-4 py-2 text-sm font-semibold text-gray-800 hover:text-maroon-700 transition-colors duration-200 uppercase tracking-wide"
                >
                  {category.name}
                </Link>

                {/* Banarasi Mega Menu */}
                {category.hasMegaMenu && banarasiMegaMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => setBanarasiMegaMenu(true)}
                    onMouseLeave={() => setBanarasiMegaMenu(false)}
                    className="absolute top-full left-0 mt-1 w-[600px] bg-white rounded-2xl shadow-elegant p-6 z-50"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-maroon-600 via-royal-600 to-gold-500" />
                    <div className="grid grid-cols-3 gap-6">
                      {Object.entries(banarasiMegaMenuItems).map(([title, items]) => (
                        <div key={title}>
                          <h3 className="font-serif font-bold text-maroon-700 mb-3 text-sm uppercase tracking-wide">
                            {title}
                          </h3>
                          <ul className="space-y-2">
                            {items.map((item) => (
                              <li key={item}>
                                <Link
                                  href={`/banarasi?filter=${item.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="block text-sm text-gray-700 hover:text-maroon-600 hover:translate-x-1 transition-all duration-200"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-beige-200">
                      <Link
                        href="/banarasi"
                        className="inline-block bg-gradient-to-r from-maroon-600 to-royal-600 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:shadow-elegant transition-all"
                      >
                        View All Banarasi Sarees →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 pr-4 bg-white border border-beige-300 rounded-full focus:outline-none focus:ring-2 focus:ring-maroon-400 focus:border-transparent transition-all text-sm"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Wishlist */}
            <Link href="/wishlist">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-gray-700 hover:text-maroon-600 transition-colors"
                aria-label="Wishlist"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-maroon-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-gray-700 hover:text-maroon-600 transition-colors"
                aria-label="Shopping Cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-maroon-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {getCartCount()}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Account */}
            {user ? (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 text-gray-700 hover:text-maroon-600 transition-colors"
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
                    <Link href="/track-order" className="block px-4 py-2 text-gray-700 hover:bg-ivory-50 rounded-lg">
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        window.location.href = '/'
                      }}
                      className="w-full text-left px-4 py-2 text-maroon-600 hover:bg-maroon-50 rounded-lg"
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
                  className="px-4 py-2 text-gray-700 hover:text-maroon-600 transition-colors font-medium"
                >
                  Sign In
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-beige-200"
            >
              <div className="py-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-ivory-100 hover:text-maroon-600 transition-colors font-semibold uppercase text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

