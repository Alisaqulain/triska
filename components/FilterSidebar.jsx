'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FilterSidebar({ onFilterChange }) {
  const [openSections, setOpenSections] = useState({
    category: true,
    ageGroup: true,
    price: true,
    fabric: false,
    occasion: false,
  })

  const [filters, setFilters] = useState({
    category: [],
    ageGroup: [],
    priceRange: [0, 50000],
    fabric: [],
    occasion: [],
  })

  const categories = ['Saree', 'Suit', 'Kurti', 'Accessories']
  const ageGroups = ['18-25', '26-35', '36-45', '45+']
  const fabrics = ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Linen', 'Velvet']
  const occasions = ['Casual', 'Wedding', 'Festive', 'Party', 'Office']

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCategoryToggle = (category) => {
    setFilters((prev) => {
      const newCategories = prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category]
      const newFilters = { ...prev, category: newCategories }
      onFilterChange?.(newFilters)
      return newFilters
    })
  }

  const handleAgeGroupToggle = (ageGroup) => {
    setFilters((prev) => {
      const newAgeGroups = prev.ageGroup.includes(ageGroup)
        ? prev.ageGroup.filter((a) => a !== ageGroup)
        : [...prev.ageGroup, ageGroup]
      const newFilters = { ...prev, ageGroup: newAgeGroups }
      onFilterChange?.(newFilters)
      return newFilters
    })
  }

  const handlePriceChange = (values) => {
    setFilters((prev) => {
      const newFilters = { ...prev, priceRange: values }
      onFilterChange?.(newFilters)
      return newFilters
    })
  }

  const handleFabricToggle = (fabric) => {
    setFilters((prev) => {
      const newFabrics = prev.fabric.includes(fabric)
        ? prev.fabric.filter((f) => f !== fabric)
        : [...prev.fabric, fabric]
      const newFilters = { ...prev, fabric: newFabrics }
      onFilterChange?.(newFilters)
      return newFilters
    })
  }

  const handleOccasionToggle = (occasion) => {
    setFilters((prev) => {
      const newOccasions = prev.occasion.includes(occasion)
        ? prev.occasion.filter((o) => o !== occasion)
        : [...prev.occasion, occasion]
      const newFilters = { ...prev, occasion: newOccasions }
      onFilterChange?.(newFilters)
      return newFilters
    })
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      category: [],
      ageGroup: [],
      priceRange: [0, 50000],
      fabric: [],
      occasion: [],
    }
    setFilters(clearedFilters)
    onFilterChange?.(clearedFilters)
  }

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-beige-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <h3 className="font-serif font-semibold text-gray-800">{title}</h3>
        <motion.svg
          animate={{ rotate: openSections[sectionKey] ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>
      <AnimatePresence>
        {openSections[sectionKey] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-white rounded-2xl shadow-soft p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-gold-600 hover:text-gold-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <FilterSection title="Category" sectionKey="category">
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="w-5 h-5 rounded border-beige-300 text-gold-500 focus:ring-gold-400 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-gold-600 transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Age Group Filter */}
      <FilterSection title="Age Group" sectionKey="ageGroup">
        <div className="space-y-2">
          {ageGroups.map((ageGroup) => (
            <label
              key={ageGroup}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.ageGroup.includes(ageGroup)}
                onChange={() => handleAgeGroupToggle(ageGroup)}
                className="w-5 h-5 rounded border-beige-300 text-gold-500 focus:ring-gold-400 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-gold-600 transition-colors">
                {ageGroup}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handlePriceChange([Number(e.target.value), filters.priceRange[1]])
              }
              className="w-full h-2 bg-beige-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handlePriceChange([filters.priceRange[0], Number(e.target.value)])
              }
              className="w-full h-2 bg-beige-200 rounded-lg appearance-none cursor-pointer accent-gold-500 absolute top-0"
            />
          </div>
        </div>
      </FilterSection>

      {/* Fabric Type Filter */}
      <FilterSection title="Fabric Type" sectionKey="fabric">
        <div className="space-y-2">
          {fabrics.map((fabric) => (
            <label
              key={fabric}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.fabric.includes(fabric)}
                onChange={() => handleFabricToggle(fabric)}
                className="w-5 h-5 rounded border-beige-300 text-gold-500 focus:ring-gold-400 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-gold-600 transition-colors">
                {fabric}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Occasion Filter */}
      <FilterSection title="Occasion" sectionKey="occasion">
        <div className="space-y-2">
          {occasions.map((occasion) => (
            <label
              key={occasion}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.occasion.includes(occasion)}
                onChange={() => handleOccasionToggle(occasion)}
                className="w-5 h-5 rounded border-beige-300 text-gold-500 focus:ring-gold-400 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-gold-600 transition-colors">
                {occasion}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </aside>
  )
}

