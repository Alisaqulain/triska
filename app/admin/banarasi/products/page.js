'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import AdminNavbar from '@/components/AdminNavbar'
import AdminProtected from '@/components/AdminProtected'
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/storage'
import { getCategoryBySlug } from '@/lib/categories'
import Link from 'next/link'

function BanarasiProductsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Banarasi',
    subCategory: '',
    ageGroup: '18-25',
    price: '',
    originalPrice: '',
    discount: '',
    image: '',
    images: [],
    fabric: 'Silk',
    occasion: 'Wedding',
    stock: '',
    description: '',
    sareeType: '',
  })

  useEffect(() => {
    const allProducts = getProducts({ category: 'Banarasi' })
    setProducts(allProducts)
  }, [])

  const category = getCategoryBySlug('banarasi')
  const subCategories = category?.subCategories || []

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const product = {
      ...formData,
      price: parseInt(formData.price),
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : null,
      discount: formData.discount ? parseInt(formData.discount) : null,
      stock: parseInt(formData.stock) || 0,
      images: formData.images.length > 0 ? formData.images : [formData.image],
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, product)
    } else {
      addProduct(product)
    }

    setProducts(getProducts({ category: 'Banarasi' }))
    setShowForm(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      category: 'Banarasi',
      subCategory: '',
      ageGroup: '18-25',
      price: '',
      originalPrice: '',
      discount: '',
      image: '',
      images: [],
      fabric: 'Silk',
      occasion: 'Wedding',
      stock: '',
      description: '',
      sareeType: '',
    })
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name || '',
      category: product.category || 'Banarasi',
      subCategory: product.subCategory || '',
      ageGroup: product.ageGroup || '18-25',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      discount: product.discount || '',
      image: product.image || product.images?.[0] || '',
      images: product.images || [],
      fabric: product.fabric || 'Silk',
      occasion: product.occasion || 'Wedding',
      stock: product.stock || '',
      description: product.description || '',
      sareeType: product.sareeType || '',
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
      setProducts(getProducts({ category: 'Banarasi' }))
    }
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-cream-50">
        <AdminNavbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold text-gray-800 mb-2">
                Banarasi Products
              </h1>
              <p className="text-gray-600">Manage Banarasi product inventory</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/admin/banarasi"
                className="px-6 py-3 border-2 border-beige-300 rounded-lg font-semibold text-gray-700 hover:bg-cream-100 transition-colors"
              >
                Manage Categories
              </Link>
              <button
                onClick={() => {
                  setShowForm(true)
                  setEditingProduct(null)
                  setFormData({
                    name: '',
                    category: 'Banarasi',
                    subCategory: '',
                    ageGroup: '18-25',
                    price: '',
                    originalPrice: '',
                    discount: '',
                    image: '',
                    images: [],
                    fabric: 'Silk',
                    occasion: 'Wedding',
                    stock: '',
                    description: '',
                    sareeType: '',
                  })
                }}
                className="bg-gradient-to-r from-gold-400 to-gold-500 text-white px-6 py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all"
              >
                + Add Product
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cream-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sub-Category</th>
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
                          src={product.image || product.images?.[0]}
                          alt={product.name}
                          className="w-16 h-20 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.ageGroup}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{product.subCategory || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">₹{product.price?.toLocaleString()}</div>
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
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                          >
                            Edit
                          </button>
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

          {/* Product Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-elegant max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl font-bold text-gray-800">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                      onClick={() => {
                        setShowForm(false)
                        setEditingProduct(null)
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
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
                          Sub-Category *
                        </label>
                        <select
                          required
                          value={formData.subCategory}
                          onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                          className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                        >
                          <option value="">Select Sub-Category</option>
                          {subCategories.map((subCat) => (
                            <option key={subCat.id} value={subCat.name}>
                              {subCat.name}
                            </option>
                          ))}
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
                        <select
                          value={formData.fabric}
                          onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                          className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                        >
                          <option>Silk</option>
                          <option>Georgette</option>
                          <option>Chiffon</option>
                          <option>Cotton</option>
                          <option>Organza</option>
                        </select>
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
                          <option>Wedding</option>
                          <option>Festive</option>
                          <option>Party</option>
                          <option>Casual</option>
                          <option>Office</option>
                        </select>
                      </div>

                      {formData.subCategory?.toLowerCase().includes('saree') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Saree Type
                          </label>
                          <input
                            type="text"
                            value={formData.sareeType}
                            onChange={(e) => setFormData({ ...formData, sareeType: e.target.value })}
                            placeholder="e.g., Katan, Organza, Georgette"
                            className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Image URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                        placeholder="https://images.unsplash.com/..."
                      />
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="mt-2 w-32 h-40 object-cover rounded-lg border border-beige-300"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Images (comma-separated URLs)
                      </label>
                      <input
                        type="text"
                        value={formData.images.join(', ')}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            images: e.target.value.split(',').map(url => url.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                        placeholder="https://image1.com, https://image2.com"
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
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-to-r from-gold-400 to-gold-500 text-white py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all"
                      >
                        {editingProduct ? 'Update Product' : 'Create Product'}
                      </motion.button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false)
                          setEditingProduct(null)
                        }}
                        className="px-6 py-3 border-2 border-beige-300 rounded-lg font-semibold text-gray-700 hover:bg-cream-100 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </AdminProtected>
  )
}

export default function BanarasiProductsPage() {
  return (
    <Suspense fallback={
      <AdminProtected>
        <div className="min-h-screen bg-cream-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
        </div>
      </AdminProtected>
    }>
      <BanarasiProductsContent />
    </Suspense>
  )
}

