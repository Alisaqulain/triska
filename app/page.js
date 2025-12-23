'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

// Sample product data
const featuredProducts = [
  {
    id: 1,
    name: 'Elegant Silk Saree',
    category: 'Saree',
    ageGroup: '26-35',
    price: 8999,
    originalPrice: 12999,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=667&fit=crop',
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
  },
]

const categories = [
  {
    name: 'Saree',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
    description: 'Elegant traditional wear',
  },
  {
    name: 'Suit',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    description: 'Modern & comfortable',
  },
  {
    name: 'Kurti',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop',
    description: 'Casual & stylish',
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop',
    description: 'Complete your look',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-beige-50 to-gold-50 py-20 md:py-32 min-h-[90vh] flex items-center">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated gradient orbs */}
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-20 left-10 w-72 h-72 bg-gold-200/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, -60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-beige-200/40 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/3 w-64 h-64 bg-cream-200/30 rounded-full blur-3xl"
            />
            
            {/* Decorative pattern overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-center lg:text-left"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block mb-6"
                >
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gold-200 text-gold-700 font-medium text-sm shadow-soft">
                    <span className="w-2 h-2 bg-gold-500 rounded-full mr-2 animate-pulse"></span>
                    New Collection 2024
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
                >
                  <span className="block text-gray-800 relative">
                    Elegance
                    <motion.span
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 bg-[length:200%_100%] opacity-30 -z-10"
                    />
                  </span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="block bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 bg-clip-text text-transparent bg-[length:200%_100%]"
                  >
                    Redefined
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-xl"
                >
                  Discover premium women&apos;s fashion that celebrates your
                  unique style with timeless designs and exceptional quality.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 items-center lg:items-start"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/products"
                      className="inline-block bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-[0_10px_30px_rgba(250,195,15,0.4)] hover:shadow-[0_15px_40px_rgba(250,195,15,0.5)] transition-all duration-300 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Shop Now</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/products"
                      className="inline-flex items-center px-6 py-4 rounded-full font-semibold text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-beige-300 hover:border-gold-400 hover:bg-white transition-all duration-300 shadow-soft"
                    >
                      Explore Collection
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-12 flex flex-wrap gap-8"
                >
                  {[
                    { number: '10K+', label: 'Happy Customers' },
                    { number: '500+', label: 'Designs' },
                    { number: '4.9', label: 'Rating' },
                  ].map((stat, index) => (
                    <div key={stat.label} className="text-center lg:text-left">
                      <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="relative"
              >
                {/* Decorative elements around image */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-200/40 rounded-full blur-2xl -z-10" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-beige-200/40 rounded-full blur-2xl -z-10" />
                
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] group">
                  <img
                    src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop"
                    alt="Fashion Hero"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Floating badge */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-gray-800">New Arrival</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Category Cards Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Shop by Category
              </h2>
              <p className="text-gray-600 text-lg">
                Explore our curated collections
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Link href={`/products?category=${category.name.toLowerCase()}`}>
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 bg-gradient-to-br from-cream-100 to-beige-100">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-serif text-2xl font-bold mb-1 drop-shadow-lg">
                          {category.name}
                        </h3>
                        <p className="text-sm text-white/90 drop-shadow-md">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 md:py-24 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 text-lg">
                Handpicked for you
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product, index) => (
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

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/products"
                  className="inline-block bg-white text-gray-800 px-8 py-3 rounded-full font-semibold shadow-soft hover:shadow-elegant transition-all duration-300 border border-beige-200"
                >
                  View All Products
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Why Choose Trisaka
              </h2>
              <p className="text-gray-600 text-lg">
                Experience premium fashion with exceptional service
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '✨',
                  title: 'Premium Quality',
                  description: 'Handpicked fabrics and exquisite craftsmanship in every piece',
                },
                {
                  icon: '🚚',
                  title: 'Free Shipping',
                  description: 'Complimentary shipping on orders above ₹2999',
                },
                {
                  icon: '↩️',
                  title: 'Easy Returns',
                  description: '30-day hassle-free return policy for your peace of mind',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-cream-50 hover:bg-cream-100 transition-colors duration-300"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="font-serif text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="py-16 md:py-24 bg-gradient-gold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center shadow-elegant"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Special Collection
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Get up to 40% off on our premium collection. Limited time offer!
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/products"
                  className="inline-block bg-gradient-to-r from-gold-400 to-gold-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-soft hover:shadow-elegant transition-all duration-300"
                >
                  Explore Collection
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

