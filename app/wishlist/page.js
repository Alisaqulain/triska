'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import MobileBottomNav from '@/components/MobileBottomNav'
import { useWishlist } from '@/contexts/WishlistContext'
import Link from 'next/link'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">❤️</div>
            <h1 className="font-serif text-4xl font-bold text-maroon-700 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Start adding items you love to your wishlist
            </p>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-maroon-600 to-royal-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-elegant transition-all"
            >
              Start Shopping
            </Link>
          </motion.div>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="font-serif text-4xl font-bold text-maroon-700 mb-2">
                My Wishlist
              </h1>
              <p className="text-gray-600">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {wishlist.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearWishlist}
                className="px-6 py-2 border-2 border-maroon-600 text-maroon-600 rounded-full font-semibold hover:bg-maroon-50 transition-colors"
              >
                Clear All
              </motion.button>
            )}
          </motion.div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}

