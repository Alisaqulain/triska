'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const router = useRouter()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="font-serif text-3xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-gold-400 to-gold-500 text-white px-8 py-3 rounded-full font-semibold shadow-soft hover:shadow-elegant transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 2999 ? 0 : 99
  const total = subtotal + shipping

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-8">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-soft p-6 flex flex-col md:flex-row gap-4"
                >
                  <div className="relative w-full md:w-32 h-40 md:h-32 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-gray-800 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.category} • {item.ageGroup}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-beige-300 flex items-center justify-center hover:bg-cream-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-semibold text-gray-800 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-beige-300 flex items-center justify-center hover:bg-cream-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-800">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        {item.originalPrice && (
                          <div className="text-sm text-gray-400 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
                <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold">Free</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                  {subtotal < 2999 && (
                    <div className="text-sm text-gold-600 bg-gold-50 p-2 rounded-lg">
                      Add ₹{(2999 - subtotal).toLocaleString()} more for free shipping!
                    </div>
                  )}
                  <div className="border-t border-beige-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => router.push('/checkout')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-gold-400 to-gold-500 text-white py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all mb-4"
                >
                  Proceed to Checkout
                </motion.button>
                <Link
                  href="/products"
                  className="block text-center text-gold-600 hover:text-gold-700 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}



