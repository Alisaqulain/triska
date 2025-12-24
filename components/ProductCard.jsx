'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  const {
    id,
    name,
    category,
    ageGroup,
    price,
    originalPrice,
    discount,
    image,
  } = product

  const discountPercentage = discount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-cream-100 to-beige-100">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full h-full will-change-transform"
        >
          <Image
            src={image || '/placeholder-product.jpg'}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Discount Badge */}
        {discount && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 left-4 z-20"
          >
            <div className="bg-gradient-to-br from-gold-400 to-gold-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
              {discountPercentage}% OFF
            </div>
          </motion.div>
        )}

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft z-20 hover:bg-white hover:shadow-elegant transition-all duration-300"
          aria-label="Add to wishlist"
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'
            }`}
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </motion.button>

        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <motion.button
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="bg-white text-gray-800 px-6 py-2.5 rounded-full font-semibold shadow-lg hover:bg-gold-400 hover:text-white transition-colors duration-200"
          >
            Quick View
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-5 bg-white">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <motion.h3 
              className="font-serif font-bold text-lg text-gray-800 mb-1.5 line-clamp-1"
              animate={{
                scale: isHovered ? 1.02 : 1,
              }}
            >
              {name}
            </motion.h3>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
              <span className="capitalize bg-beige-100 px-2 py-1 rounded-full">{category}</span>
              <span className="text-beige-400">•</span>
              <span className="text-gray-600 font-medium">{ageGroup}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl font-bold text-gray-800">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
              <span className="text-xs text-gold-600 font-semibold">
                ({discountPercentage}% off)
              </span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <motion.button
            onClick={() => addToCart(product)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-gold-400 to-gold-500 text-white py-2.5 rounded-lg font-medium shadow-soft hover:shadow-elegant transition-all duration-200"
          >
            Add to Cart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 border-2 border-beige-300 rounded-lg flex items-center justify-center hover:border-gold-400 hover:bg-gold-50 transition-colors"
            aria-label="Quick add"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

