'use client'

import { useState, useEffect, Suspense } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import FilterSidebar from '@/components/FilterSidebar'
import { getProducts } from '@/lib/storage'
import { getCategoryBySlug, getSubCategoryBySlug } from '@/lib/categories'

function BanarasiContent() {
  const params = useParams()
  const subcategory = params.subcategory
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    category: ['Banarasi'],
    subCategory: [],
    ageGroup: [],
    priceRange: [0, 100000],
    fabric: [],
    occasion: [],
    sareeType: [],
  })
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    // Get subcategory info
    const category = getCategoryBySlug('banarasi')
    const subCategory = getSubCategoryBySlug('banarasi', subcategory)
    
    if (subCategory) {
      setFilters(prev => ({
        ...prev,
        subCategory: [subCategory.name],
      }))
    }

    // Load products
    const allProducts = getProducts({ category: 'Banarasi', subCategory: subCategory?.name })
    setProducts(allProducts)
  }, [subcategory])

  useEffect(() => {
    let filtered = getProducts({ category: 'Banarasi' })

    // Sub-category filter
    if (filters.subCategory.length > 0) {
      filtered = filtered.filter(p => filters.subCategory.includes(p.subCategory))
    }

    // Age group filter
    if (filters.ageGroup.length > 0) {
      filtered = filtered.filter(p => filters.ageGroup.includes(p.ageGroup))
    }

    // Price range filter
    filtered = filtered.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // Fabric filter
    if (filters.fabric.length > 0) {
      filtered = filtered.filter(p => filters.fabric.includes(p.fabric))
    }

    // Occasion filter
    if (filters.occasion.length > 0) {
      filtered = filtered.filter(p => filters.occasion.includes(p.occasion))
    }

    // Saree Type filter
    if (filters.sareeType && filters.sareeType.length > 0) {
      filtered = filtered.filter(p => filters.sareeType.includes(p.sareeType))
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'discount') {
      filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0))
    }

    setProducts(filtered)
  }, [filters, sortBy])

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const subcategoryNames = {
    saree: 'Banarasi Saree',
    suit: 'Banarasi Suit',
    dupatta: 'Banarasi Dupatta',
    lehenga: 'Banarasi Lehenga',
    other: 'Other Banarasi Products',
  }

  const displayName = subcategoryNames[subcategory] || 'Banarasi Products'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold">
                New Banarasi Collection
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              {displayName}
            </h1>
            <p className="text-gray-600">
              Discover exquisite Banarasi craftsmanship and timeless elegance
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-64 lg:flex-shrink-0">
              <FilterSidebar 
                onFilterChange={handleFilterChange}
                defaultCategory="Banarasi"
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{products.length}</span> products
                </p>
                <div className="flex items-center space-x-2">
                  <label className="text-gray-600 text-sm">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Best Discount</option>
                  </select>
                </div>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-gray-600 text-lg mb-4">
                    No products found in this category.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        category: ['Banarasi'],
                        subCategory: [],
                        ageGroup: [],
                        priceRange: [0, 100000],
                        fabric: [],
                        occasion: [],
                        sareeType: [],
                      })
                    }}
                    className="text-gold-600 hover:text-gold-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function BanarasiPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <BanarasiContent />
    </Suspense>
  )
}

