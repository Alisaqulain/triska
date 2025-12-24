'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import FilterSidebar from '@/components/FilterSidebar'
import { getProducts } from '@/lib/storage'

// Fallback product data
const defaultProducts = [
  {
    id: 1,
    name: 'Elegant Silk Saree',
    category: 'Saree',
    ageGroup: '26-35',
    price: 8999,
    originalPrice: 12999,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=667&fit=crop',
    fabric: 'Silk',
    occasion: 'Wedding',
  },
  {
    id: 2,
    name: 'Designer Suit Set',
    category: 'Suit',
    ageGroup: '18-25',
    price: 5999,
    originalPrice: 7999,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=667&fit=crop',
    fabric: 'Cotton',
    occasion: 'Casual',
  },
  {
    id: 3,
    name: 'Floral Print Kurti',
    category: 'Kurti',
    ageGroup: '26-35',
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=667&fit=crop',
    fabric: 'Cotton',
    occasion: 'Casual',
  },
  {
    id: 4,
    name: 'Gold Statement Necklace',
    category: 'Accessories',
    ageGroup: '26-35',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=667&fit=crop',
    fabric: 'Gold',
    occasion: 'Party',
  },
  {
    id: 5,
    name: 'Bridal Lehenga Saree',
    category: 'Saree',
    ageGroup: '26-35',
    price: 19999,
    originalPrice: 24999,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83d71fda?w=500&h=667&fit=crop',
    fabric: 'Silk',
    occasion: 'Wedding',
  },
  {
    id: 6,
    name: 'Casual Cotton Suit',
    category: 'Suit',
    ageGroup: '18-25',
    price: 3999,
    originalPrice: 5499,
    discount: 27,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=667&fit=crop',
    fabric: 'Cotton',
    occasion: 'Casual',
  },
  {
    id: 7,
    name: 'Embroidered Kurti',
    category: 'Kurti',
    ageGroup: '36-45',
    price: 3299,
    originalPrice: 4499,
    discount: 27,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=667&fit=crop',
    fabric: 'Georgette',
    occasion: 'Office',
  },
  {
    id: 8,
    name: 'Pearl Drop Earrings',
    category: 'Accessories',
    ageGroup: '26-35',
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=667&fit=crop',
    fabric: 'Pearl',
    occasion: 'Party',
  },
  {
    id: 9,
    name: 'Festive Georgette Saree',
    category: 'Saree',
    ageGroup: '36-45',
    price: 6999,
    originalPrice: 9999,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=667&fit=crop',
    fabric: 'Georgette',
    occasion: 'Festive',
  },
  {
    id: 10,
    name: 'Formal Office Suit',
    category: 'Suit',
    ageGroup: '26-35',
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=667&fit=crop',
    fabric: 'Linen',
    occasion: 'Office',
  },
  {
    id: 11,
    name: 'Designer Chiffon Kurti',
    category: 'Kurti',
    ageGroup: '18-25',
    price: 2799,
    originalPrice: 3999,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=667&fit=crop',
    fabric: 'Chiffon',
    occasion: 'Party',
  },
  {
    id: 12,
    name: 'Diamond Stud Earrings',
    category: 'Accessories',
    ageGroup: '26-35',
    price: 5999,
    originalPrice: 8999,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=667&fit=crop',
    fabric: 'Diamond',
    occasion: 'Wedding',
  },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const [allProducts, setAllProducts] = useState(defaultProducts)
  const [filters, setFilters] = useState({
    category: [],
    ageGroup: [],
    priceRange: [0, 50000],
    fabric: [],
    occasion: [],
  })
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    // Load products from storage
    const products = getProducts()
    if (products.length > 0) {
      setAllProducts(products)
      setFilteredProducts(products)
    }
  }, [])

  useEffect(() => {
    // Apply category filter from URL
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setFilters((prev) => ({
        ...prev,
        category: [categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)],
      }))
    }
  }, [searchParams])

  useEffect(() => {
    let filtered = [...allProducts]

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter((product) =>
        filters.category.includes(product.category)
      )
    }

    // Age group filter
    if (filters.ageGroup.length > 0) {
      filtered = filtered.filter((product) =>
        filters.ageGroup.includes(product.ageGroup)
      )
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    )

    // Fabric filter
    if (filters.fabric.length > 0) {
      filtered = filtered.filter((product) =>
        filters.fabric.includes(product.fabric)
      )
    }

    // Occasion filter
    if (filters.occasion.length > 0) {
      filtered = filtered.filter((product) =>
        filters.occasion.includes(product.occasion)
      )
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'discount') {
      filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0))
    }

    setFilteredProducts(filtered)
  }, [filters, sortBy])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

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
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Our Products
            </h1>
            <p className="text-gray-600">
              Discover our curated collection of premium fashion
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-64 lg:flex-shrink-0">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort and Results Count */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredProducts.length}</span> products
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

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
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
                    No products found matching your filters.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        category: [],
                        ageGroup: [],
                        priceRange: [0, 50000],
                        fabric: [],
                        occasion: [],
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

export default function ProductsPage() {
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
      <ProductsContent />
    </Suspense>
  )
}

