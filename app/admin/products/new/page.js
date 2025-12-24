'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AdminNavbar from '@/components/AdminNavbar'
import AdminProtected from '@/components/AdminProtected'
import { addProduct } from '@/lib/storage'

export default function NewProduct() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Saree',
    ageGroup: '18-25',
    price: '',
    originalPrice: '',
    discount: '',
    image: '',
    fabric: '',
    occasion: 'Casual',
    stock: '',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const product = {
      ...formData,
      price: parseInt(formData.price),
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : null,
      discount: formData.discount ? parseInt(formData.discount) : null,
      stock: parseInt(formData.stock) || 0,
    }

    addProduct(product)
    router.push('/admin/products')
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-cream-50">
        <AdminNavbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-8">
            Add New Product
          </h1>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-soft p-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option>Saree</option>
                  <option>Suit</option>
                  <option>Kurti</option>
                  <option>Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Group *
                </label>
                <select
                  required
                  value={formData.ageGroup}
                  onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                  className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option>18-25</option>
                  <option>26-35</option>
                  <option>36-45</option>
                  <option>45+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fabric Type
                </label>
                <input
                  type="text"
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occasion
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option>Casual</option>
                  <option>Wedding</option>
                  <option>Festive</option>
                  <option>Party</option>
                  <option>Office</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-gold-400 to-gold-500 text-white py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Product'}
              </motion.button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border-2 border-beige-300 rounded-lg font-semibold text-gray-700 hover:bg-cream-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        </main>
      </div>
    </AdminProtected>
  )
}



