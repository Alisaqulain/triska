'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getCategoryBySlug } from '@/lib/categories'

export default function BanarasiPage() {
  const category = getCategoryBySlug('banarasi')
  const subCategories = category?.subCategories || []

  const subCategoryCards = [
    {
      slug: 'saree',
      name: 'Banarasi Saree',
      description: 'Exquisite handwoven silk sarees',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=667&fit=crop',
    },
    {
      slug: 'suit',
      name: 'Banarasi Suit',
      description: 'Elegant Banarasi suit sets',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=667&fit=crop',
    },
    {
      slug: 'dupatta',
      name: 'Banarasi Dupatta',
      description: 'Beautiful Banarasi dupattas',
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=667&fit=crop',
    },
    {
      slug: 'lehenga',
      name: 'Banarasi Lehenga',
      description: 'Stunning Banarasi lehengas',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83d71fda?w=500&h=667&fit=crop',
    },
    {
      slug: 'other',
      name: 'Other Banarasi Products',
      description: 'More Banarasi collections',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=667&fit=crop',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-beige-50 to-gold-50 py-20 md:py-32">
          <div className="absolute inset-0 overflow-hidden">
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
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold">
                  New Banarasi Collection
                </span>
              </motion.div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6">
                Banarasi
                <span className="block text-gold-500">Heritage</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Experience the timeless elegance of Banarasi craftsmanship. 
                Handwoven with love, each piece tells a story of tradition and luxury.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sub-Categories Grid */}
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
                Explore Our Collections
              </h2>
              <p className="text-gray-600 text-lg">
                Discover the finest Banarasi products
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {subCategoryCards.map((card, index) => (
                <motion.div
                  key={card.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Link href={`/banarasi/${card.slug}`}>
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 bg-gradient-to-br from-cream-100 to-beige-100">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-serif text-xl font-bold mb-1 drop-shadow-lg">
                          {card.name}
                        </h3>
                        <p className="text-sm text-white/90 drop-shadow-md">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

