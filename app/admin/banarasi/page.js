'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminNavbar from '@/components/AdminNavbar'
import AdminProtected from '@/components/AdminProtected'
import { getCategoryBySlug, updateCategory, addSubCategory, updateSubCategory, deleteSubCategory } from '@/lib/categories'
import Link from 'next/link'

export default function BanarasiAdminPage() {
  const [category, setCategory] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newSubCategory, setNewSubCategory] = useState({ name: '', slug: '' })
  const [editingSubCategory, setEditingSubCategory] = useState(null)

  useEffect(() => {
    const banarasiCategory = getCategoryBySlug('banarasi')
    setCategory(banarasiCategory)
  }, [])

  const handleAddSubCategory = () => {
    if (!newSubCategory.name || !newSubCategory.slug) return
    
    const slug = newSubCategory.slug || newSubCategory.name.toLowerCase().replace(/\s+/g, '-')
    addSubCategory(category.id, { name: newSubCategory.name, slug })
    setCategory(getCategoryBySlug('banarasi'))
    setNewSubCategory({ name: '', slug: '' })
  }

  const handleUpdateSubCategory = (subCategoryId) => {
    if (!editingSubCategory.name) return
    updateSubCategory(category.id, subCategoryId, editingSubCategory)
    setCategory(getCategoryBySlug('banarasi'))
    setEditingSubCategory(null)
  }

  const handleDeleteSubCategory = (subCategoryId) => {
    if (confirm('Are you sure you want to delete this sub-category?')) {
      deleteSubCategory(category.id, subCategoryId)
      setCategory(getCategoryBySlug('banarasi'))
    }
  }

  if (!category) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-cream-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
        </div>
      </AdminProtected>
    )
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-cream-50">
        <AdminNavbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold text-gray-800 mb-2">
                Banarasi Category Management
              </h1>
              <p className="text-gray-600">Manage Banarasi categories and sub-categories</p>
            </div>
            <Link
              href="/admin/banarasi/products"
              className="bg-gradient-to-r from-gold-400 to-gold-500 text-white px-6 py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all"
            >
              Manage Products
            </Link>
          </div>

          {/* Category Info */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-gray-800">
                {category.name}
              </h2>
              <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold">
                Active
              </span>
            </div>
            <p className="text-gray-600">Slug: /{category.slug}</p>
          </div>

          {/* Sub-Categories */}
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-800">
                Sub-Categories
              </h2>
              <span className="text-gray-600">
                {category.subCategories?.length || 0} sub-categories
              </span>
            </div>

            <div className="space-y-4 mb-6">
              {category.subCategories?.map((subCat) => (
                <div
                  key={subCat.id}
                  className="flex items-center justify-between p-4 border border-beige-200 rounded-lg hover:bg-cream-50 transition-colors"
                >
                  {editingSubCategory?.id === subCat.id ? (
                    <div className="flex-1 flex items-center space-x-4">
                      <input
                        type="text"
                        value={editingSubCategory.name}
                        onChange={(e) =>
                          setEditingSubCategory({ ...editingSubCategory, name: e.target.value })
                        }
                        className="flex-1 px-4 py-2 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                      <button
                        onClick={() => handleUpdateSubCategory(subCat.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingSubCategory(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{subCat.name}</h3>
                        <p className="text-sm text-gray-500">/{category.slug}/{subCat.slug}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/banarasi/products?subCategory=${subCat.id}`}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                          View Products
                        </Link>
                        <button
                          onClick={() => setEditingSubCategory({ id: subCat.id, name: subCat.name, slug: subCat.slug })}
                          className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSubCategory(subCat.id)}
                          className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Add New Sub-Category */}
            <div className="border-t border-beige-200 pt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Add New Sub-Category</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Sub-category name (e.g., Banarasi Saree)"
                  value={newSubCategory.name}
                  onChange={(e) =>
                    setNewSubCategory({
                      ...newSubCategory,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                    })
                  }
                  className="flex-1 px-4 py-2 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <input
                  type="text"
                  placeholder="Slug (auto-generated)"
                  value={newSubCategory.slug}
                  onChange={(e) => setNewSubCategory({ ...newSubCategory, slug: e.target.value })}
                  className="w-48 px-4 py-2 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <button
                  onClick={handleAddSubCategory}
                  className="bg-gradient-to-r from-gold-400 to-gold-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-elegant transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminProtected>
  )
}

