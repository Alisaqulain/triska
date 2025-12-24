'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminNavbar from '@/components/AdminNavbar'
import AdminProtected from '@/components/AdminProtected'
import { getOrders, updateOrderStatus } from '@/lib/storage'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    setOrders(getOrders())
  }, [])

  const handleStatusChange = (id, newStatus) => {
    updateOrderStatus(id, newStatus)
    setOrders(getOrders())
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-cream-50">
        <AdminNavbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-8">
            Orders Management
          </h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
              <p className="text-gray-600">Orders will appear here when customers make purchases.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-soft p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Order ID</div>
                          <div className="font-semibold text-gray-800">#{order.id}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Customer</div>
                          <div className="font-semibold text-gray-800">
                            {order.customerName || 'Guest User'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Date</div>
                          <div className="font-semibold text-gray-800">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Total</div>
                          <div className="font-semibold text-gray-800">
                            ₹{order.total?.toLocaleString() || '0'}
                          </div>
                        </div>
                      </div>
                      {order.items && (
                        <div className="text-sm text-gray-600">
                          {order.items.length} item(s)
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={order.status || 'pending'}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm border-2 ${
                          statusColors[order.status] || statusColors.pending
                        } border-transparent focus:outline-none focus:ring-2 focus:ring-gold-400`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </AdminProtected>
  )
}



