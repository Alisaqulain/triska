'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminNavbar from '@/components/AdminNavbar'
import AdminProtected from '@/components/AdminProtected'
import { getProducts, getOrders } from '@/lib/storage'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    const products = getProducts()
    const orders = getOrders()
    
    const pendingOrders = orders.filter((o) => o.status === 'pending').length
    const totalRevenue = orders
      .filter((o) => o.status === 'completed')
      .reduce((sum, o) => sum + (o.total || 0), 0)

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      pendingOrders,
      totalRevenue,
    })
  }, [])

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: '👗',
      color: 'from-blue-400 to-blue-500',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: '📦',
      color: 'from-purple-400 to-purple-500',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: '⏳',
      color: 'from-orange-400 to-orange-500',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: '💰',
      color: 'from-gold-400 to-gold-500',
    },
  ]

  return (
    <AdminProtected>
      <div className="min-h-screen bg-cream-50">
        <AdminNavbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl font-bold text-gray-800 mb-8">
              Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl`}>
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="font-serif text-2xl font-bold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="/admin/products/new"
                  className="p-4 border-2 border-dashed border-beige-300 rounded-lg hover:border-gold-400 hover:bg-gold-50 transition-colors text-center"
                >
                  <div className="text-3xl mb-2">➕</div>
                  <div className="font-semibold text-gray-800">Add New Product</div>
                </a>
                <a
                  href="/admin/orders"
                  className="p-4 border-2 border-dashed border-beige-300 rounded-lg hover:border-gold-400 hover:bg-gold-50 transition-colors text-center"
                >
                  <div className="text-3xl mb-2">📦</div>
                  <div className="font-semibold text-gray-800">View Orders</div>
                </a>
                <a
                  href="/admin/settings"
                  className="p-4 border-2 border-dashed border-beige-300 rounded-lg hover:border-gold-400 hover:bg-gold-50 transition-colors text-center"
                >
                  <div className="text-3xl mb-2">⚙️</div>
                  <div className="font-semibold text-gray-800">Settings</div>
                </a>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </AdminProtected>
  )
}


