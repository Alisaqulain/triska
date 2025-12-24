'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import AdminNavbar from '@/components/AdminNavbar'
import AdminProtected from '@/components/AdminProtected'
import { getProducts, deleteProduct } from '@/lib/storage'
import Link from 'next/link'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const router = useRouter()

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
      setProducts(getProducts())
    }
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-cream-50">
        <AdminNavbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-4xl font-bold text-gray-800">
              Products Management
            </h1>
            <Link
              href="/admin/products/new"
              className="bg-gradient-to-r from-gold-400 to-gold-500 text-white px-6 py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all"
            >
              + Add New Product
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cream-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-beige-200">
                  {products.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-cream-50"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-20 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.ageGroup}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{product.category}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">₹{product.price.toLocaleString()}</div>
                        {product.originalPrice && (
                          <div className="text-sm text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.stock > 20
                            ? 'bg-green-100 text-green-700'
                            : product.stock > 0
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {product.stock || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/products/edit/${product.id}`}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminProtected>
  )
}



