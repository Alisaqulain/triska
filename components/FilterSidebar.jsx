'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FilterSidebar({ onFilterChange, defaultCategory }) {
  const [openSections, setOpenSections] = useState({
    category: true,
    ageGroup: true,
    price: true,
    fabric: false,
    occasion: false,
    sareeType: false,
    weave: false,
    color: false,
    shipping: false,
  })

  const [filters, setFilters] = useState({
    category: [],
    ageGroup: [],
    priceRange: [0, 50000],
    fabric: [],
    occasion: [],
    sareeType: [],
    weave: [],
    color: [],
    shipping: [],
  })

  const categories = ['Saree', 'Suit', 'Kurti', 'Accessories']
  const ageGroups = ['18-25', '26-35', '36-45', '45+']
  const fabrics = ['Silk', 'Katan', 'Organza', 'Tissue', 'Pure Silk', 'Georgette', 'Cotton', 'Chiffon', 'Linen', 'Velvet']
  const occasions = ['Casual', 'Wedding', 'Festive', 'Party', 'Office', 'Traditional', 'Bridal']
  const weaves = ['Kadhwa', 'Cutwork', 'Jangla', 'Butidar', 'Tanchoi', 'Brocade']
  const colors = ['Red', 'Maroon', 'Gold', 'Green', 'Blue', 'Pink', 'Purple', 'Black', 'White', 'Beige']
  const shippingOptions = ['Ready to Ship', 'Custom Order']

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

  const handleWeaveToggle = (weave) => {
    setFilters((prev) => {
      const newWeaves = prev.weave.includes(weave)
        ? prev.weave.filter((w) => w !== weave)
        : [...prev.weave, weave]
      const newFilters = { ...prev, weave: newWeaves }
      onFilterChange?.(newFilters)
      return newFilters
    })
  }

  const handleColorToggle = (color) => {
    setFilters((prev) => {
      const newColors = prev.color.includes(color)
        ? prev.color.filter((c) => c !== color)
        : [...prev.color, color]
      const newFilters = { ...prev, color: newColors }
      onFilterChange?.(newFilters)
      return newFilters
    })
  }

  const handleShippingToggle = (option) => {
    setFilters((prev) => {
      const newShipping = prev.shipping.includes(option)
        ? prev.shipping.filter((s) => s !== option)
        : [...prev.shipping, option]
      const newFilters = { ...prev, shipping: newShipping }
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
      sareeType: [],
      weave: [],
      color: [],
      shipping: [],
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
          className="text-sm text-maroon-600 hover:text-maroon-700 font-medium"
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
                className="w-5 h-5 rounded border-beige-300 text-maroon-600 focus:ring-maroon-400 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-maroon-600 transition-colors">
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
                className="w-5 h-5 rounded border-beige-300 text-maroon-600 focus:ring-maroon-400 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-maroon-600 transition-colors">
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
              className="w-full h-2 bg-beige-200 rounded-lg appearance-none cursor-pointer accent-maroon-600"
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
                className="w-5 h-5 rounded border-beige-300 text-maroon-600 focus:ring-maroon-400 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-maroon-600 transition-colors">
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
                className="w-5 h-5 rounded border-beige-300 text-maroon-600 focus:ring-maroon-400 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-maroon-600 transition-colors">
                {occasion}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Saree Type Filter (for Banarasi Saree) */}
      {(defaultCategory === 'Banarasi' || filters.category?.includes('Banarasi')) && (
        <FilterSection title="Saree Type" sectionKey="sareeType">
          <div className="space-y-2">
            {['Katan', 'Organza', 'Georgette', 'Pure Silk', 'Tissue'].map((type) => (
              <label
                key={type}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.sareeType?.includes(type) || false}
                  onChange={() => {
                    const newTypes = filters.sareeType?.includes(type)
                      ? filters.sareeType.filter(t => t !== type)
                      : [...(filters.sareeType || []), type]
                    setFilters(prev => ({ ...prev, sareeType: newTypes }))
                    onFilterChange?.({ ...filters, sareeType: newTypes })
                  }}
                  className="w-5 h-5 rounded border-beige-300 text-maroon-600 focus:ring-maroon-400 focus:ring-2 cursor-pointer"
                />
                <span className="text-gray-700 group-hover:text-maroon-600 transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Weave Filter (for Banarasi) */}
      {(defaultCategory === 'Banarasi' || filters.category?.includes('Banarasi')) && (
        <FilterSection title="Weave" sectionKey="weave">
          <div className="space-y-2">
            {weaves.map((weave) => (
              <label
                key={weave}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.weave.includes(weave)}
                  onChange={() => handleWeaveToggle(weave)}
                  className="w-5 h-5 rounded border-beige-300 text-maroon-600 focus:ring-maroon-400 focus:ring-2 cursor-pointer"
                />
                <span className="text-gray-700 group-hover:text-maroon-600 transition-colors">
                  {weave}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Color Filter */}
      <FilterSection title="Color" sectionKey="color">
        <div className="space-y-2">
          {colors.map((color) => (
            <label
              key={color}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.color.includes(color)}
                onChange={() => handleColorToggle(color)}
                className="w-5 h-5 rounded border-beige-300 text-maroon-600 focus:ring-maroon-400 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-maroon-600 transition-colors">
                {color}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Shipping Filter */}
      <FilterSection title="Shipping" sectionKey="shipping">
        <div className="space-y-2">
          {shippingOptions.map((option) => (
            <label
              key={option}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.shipping.includes(option)}
                onChange={() => handleShippingToggle(option)}
                className="w-5 h-5 rounded border-beige-300 text-maroon-600 focus:ring-maroon-400 focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-maroon-600 transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </aside>
  )
}




