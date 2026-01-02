'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PremiumNavbar from '@/components/PremiumNavbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import MobileBottomNav from '@/components/MobileBottomNav'
import WhatsAppButton from '@/components/WhatsAppButton'
import VideoCallButton from '@/components/VideoCallButton'
import Link from 'next/link'
import { getProducts } from '@/lib/storage'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    const products = getProducts()
    setFeaturedProducts(products.slice(0, 8))
    setBestSellers(products.slice(0, 4))
  }, [])

  const banarasiTypes = [
    { name: 'Handloom', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop', description: 'Authentic handwoven Banarasi' },
    { name: 'Katan', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop', description: 'Pure silk Katan sarees' },
    { name: 'Organza', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop', description: 'Elegant Organza collection' },
    { name: 'Tissue', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop', description: 'Luxurious Tissue sarees' },
  ]

  const occasions = [
    { name: 'Wedding', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83d71fda?w=400&h=500&fit=crop', count: '50+' },
    { name: 'Festive', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop', count: '80+' },
    { name: 'Party', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop', count: '40+' },
    { name: 'Casual', image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop', count: '60+' },
  ]

  const accessories = [
    { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop', count: '120+' },
    { name: 'Dupattas', image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop', count: '45+' },
    { name: 'Blouses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop', count: '70+' },
    { name: 'Potlis', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop', count: '30+' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50">
      <PremiumNavbar />

      <main className="flex-1">
        {/* Hero Banner Slider */}
        <section className="relative h-[90vh] overflow-hidden">
          <div className="absolute inset-0">
            <motion.img
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1920&h=1080&fit=crop"
              alt="Banarasi Saree"
              className="w-full h-full object-cover"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block mb-6"
                >
                  <span className="px-4 py-2 bg-gold-500/90 backdrop-blur-sm text-white rounded-full text-sm font-semibold uppercase tracking-wide">
                    Handloom Heritage
                  </span>
                </motion.div>
                <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  Timeless
                  <span className="block text-gold-400">Banarasi</span>
                  <span className="block">Elegance</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Experience the artistry of handwoven Banarasi sarees. 
                  Each piece is a masterpiece of tradition and luxury.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/banarasi"
                    className="inline-block bg-gradient-to-r from-maroon-600 to-royal-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-elegant hover:shadow-soft-lg transition-all duration-300 uppercase tracking-wide"
                  >
                    Explore Banarasi Collection
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Slider Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
            {[1, 2, 3].map((dot) => (
              <button
                key={dot}
                className={`w-3 h-3 rounded-full transition-all ${
                  dot === 1 ? 'bg-gold-400 w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Banarasi Special Section */}
        <section className="py-20 bg-gradient-to-b from-ivory-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-maroon-700 mb-4">
                Banarasi Special
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our exclusive collection of handwoven Banarasi sarees
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {banarasiTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Link href={`/banarasi?type=${type.name.toLowerCase()}`}>
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-elegant hover:shadow-soft-lg transition-all bg-gradient-to-br from-ivory-100 to-beige-100">
                      <img
                        src={type.image}
                        alt={type.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-serif text-2xl font-bold mb-1">{type.name}</h3>
                        <p className="text-sm text-white/90">{type.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-5xl font-bold text-maroon-700 mb-4">
                Best Sellers
              </h2>
              <p className="text-lg text-gray-600">Most loved by our customers</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bestSellers.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Occasion Wear */}
        <section className="py-20 bg-gradient-to-b from-white to-ivory-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-5xl font-bold text-maroon-700 mb-4">
                Occasion Wear
              </h2>
              <p className="text-lg text-gray-600">Perfect outfits for every celebration</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {occasions.map((occasion, index) => (
                <motion.div
                  key={occasion.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link href={`/products?occasion=${occasion.name.toLowerCase()}`}>
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-elegant hover:shadow-soft-lg transition-all">
                      <img
                        src={occasion.image}
                        alt={occasion.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 via-maroon-900/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-serif text-3xl font-bold mb-2">{occasion.name}</h3>
                        <p className="text-sm text-white/90">{occasion.count} Designs</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Accessories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-5xl font-bold text-maroon-700 mb-4">
                Accessories
              </h2>
              <p className="text-lg text-gray-600">Complete your look with our curated accessories</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {accessories.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link href={`/products?category=${item.name.toLowerCase()}`}>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-elegant hover:shadow-soft-lg transition-all">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-serif text-2xl font-bold mb-1">{item.name}</h3>
                        <p className="text-sm text-white/90">{item.count} Items</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Craftsmanship Story */}
        <section className="py-20 bg-gradient-to-br from-maroon-50 via-royal-50 to-gold-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-5xl font-bold text-maroon-700 mb-6">
                  Handloom Heritage
                </h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Our Banarasi sarees are crafted by master weavers using traditional handloom techniques 
                  passed down through generations. Each piece takes weeks to create, ensuring unparalleled 
                  quality and authenticity.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We work directly with artisans in Varanasi, supporting their craft and preserving 
                  this rich cultural heritage. Every saree comes with a certificate of authenticity.
                </p>
                <Link
                  href="/craftsmanship"
                  className="inline-block bg-maroon-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-maroon-700 transition-colors"
                >
                  Learn More About Our Craft
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
                  <img
                    src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop"
                    alt="Handloom Weaving"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-5xl font-bold text-maroon-700 mb-4">
                What Our Customers Say
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Priya Sharma',
                  location: 'Mumbai',
                  rating: 5,
                  text: 'The Banarasi saree I purchased is absolutely stunning! The craftsmanship is exceptional and the quality is beyond my expectations.',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                },
                {
                  name: 'Anjali Patel',
                  location: 'Delhi',
                  rating: 5,
                  text: 'Trisaka has the most authentic Banarasi collection. The handloom certificate gives me confidence in my purchase.',
                  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                },
                {
                  name: 'Riya Mehta',
                  location: 'Bangalore',
                  rating: 5,
                  text: 'Beautiful sarees and excellent customer service. The video call feature helped me choose the perfect piece!',
                  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-ivory-50 rounded-2xl p-6 shadow-soft"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-gold-500">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-gradient-to-r from-maroon-600 to-royal-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Subscribe to get exclusive offers and new collection updates
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-400 text-gray-900"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold-500 text-white px-8 py-4 rounded-full font-bold hover:bg-gold-600 transition-colors uppercase tracking-wide"
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />
      <VideoCallButton />
    </div>
  )
}

