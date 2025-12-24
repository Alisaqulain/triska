'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getOrders } from '@/lib/storage'
import Link from 'next/link'

function TrackOrderContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState(null)
  const [trackingId, setTrackingId] = useState(orderId || '')

  useEffect(() => {
    if (orderId) {
      const orders = getOrders()
      const foundOrder = orders.find(o => o.id === parseInt(orderId))
      if (foundOrder) {
        setOrder(foundOrder)
      }
    }
  }, [orderId])

  const handleSearch = () => {
    if (trackingId) {
      const orders = getOrders()
      const foundOrder = orders.find(o => o.id === parseInt(trackingId))
      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        alert('Order not found')
      }
    }
  }

  const statusSteps = [
    { key: 'pending', label: 'Order Placed', icon: '📦' },
    { key: 'processing', label: 'Processing', icon: '⚙️' },
    { key: 'shipped', label: 'Shipped', icon: '🚚' },
    { key: 'completed', label: 'Delivered', icon: '✅' },
  ]

  const getStatusIndex = (status) => {
    return statusSteps.findIndex(s => s.key === status)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-8 text-center">
            Track Your Order
          </h1>

          {!order && (
            <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter Order ID"
                  className="flex-1 px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <motion.button
                  onClick={handleSearch}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-gold-400 to-gold-500 text-white px-8 py-3 rounded-lg font-semibold shadow-soft"
                >
                  Track
                </motion.button>
              </div>
            </div>
          )}

          {order && (
            <>
              <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-800 mb-2">
                      Order #{order.id}
                    </h2>
                    <p className="text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`px-4 py-2 rounded-full font-semibold ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-800 mb-6">Order Status</h3>
                  <div className="relative">
                    {statusSteps.map((step, index) => {
                      const currentIndex = getStatusIndex(order.status)
                      const isCompleted = index <= currentIndex
                      const isCurrent = index === currentIndex

                      return (
                        <div key={step.key} className="flex items-start mb-8 last:mb-0">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                            isCompleted ? 'bg-gold-400 text-white' : 'bg-beige-200 text-gray-400'
                          }`}>
                            {step.icon}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className={`font-semibold ${
                              isCompleted ? 'text-gray-800' : 'text-gray-400'
                            }`}>
                              {step.label}
                            </div>
                            {isCurrent && (
                              <div className="text-sm text-gray-600 mt-1">
                                Your order is currently being {step.label.toLowerCase()}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-white rounded-2xl shadow-soft p-8">
                <h3 className="font-serif text-2xl font-bold text-gray-800 mb-6">
                  Order Details
                </h3>
                <div className="space-y-4">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-4 border-b border-beige-200 last:border-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-lg bg-cream-100 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{item.name}</div>
                          <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="font-semibold text-gray-800">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-beige-200">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>₹{order.total?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/products"
                  className="inline-block bg-gradient-to-r from-gold-400 to-gold-500 text-white px-8 py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all"
                >
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order tracking...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  )
}

