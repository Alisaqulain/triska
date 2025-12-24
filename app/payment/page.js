'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getOrders, updateOrderStatus } from '@/lib/storage'
import Link from 'next/link'

function PaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [paymentStatus, setPaymentStatus] = useState('processing')
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (orderId) {
      const orders = getOrders()
      const foundOrder = orders.find(o => o.id === parseInt(orderId))
      if (foundOrder) {
        setOrder(foundOrder)
      }
    }
  }, [orderId])

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success')
      if (orderId) {
        updateOrderStatus(parseInt(orderId), 'processing')
      }
    }, 2000)
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-8">
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </p>
            {orderId && (
              <div className="bg-cream-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Order ID</p>
                <p className="font-semibold text-gray-800">#{orderId}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/track-order?orderId=${orderId}`}
                className="bg-gradient-to-r from-gold-400 to-gold-500 text-white px-8 py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all"
              >
                Track Order
              </Link>
              <Link
                href="/products"
                className="bg-white border-2 border-beige-300 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-cream-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-8 text-center">
            Payment
          </h1>

          {order && (
            <div className="bg-white rounded-2xl shadow-soft p-8 mb-6">
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl font-bold text-gray-800 mb-2">
                  Order Summary
                </h2>
                <p className="text-gray-600">Order ID: #{order.id}</p>
              </div>
              <div className="border-t border-beige-200 pt-6">
                <div className="flex justify-between text-xl font-bold text-gray-800 mb-4">
                  <span>Total Amount</span>
                  <span>₹{order.total?.toLocaleString() || '0'}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-soft p-8">
            <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">
              Payment Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
            </div>
            <motion.button
              onClick={handlePayment}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 bg-gradient-to-r from-gold-400 to-gold-500 text-white py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all"
            >
              Pay ₹{order?.total?.toLocaleString() || '0'}
            </motion.button>
            <p className="text-center text-sm text-gray-500 mt-4">
              🔒 Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payment...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <PaymentContent />
    </Suspense>
  )
}

