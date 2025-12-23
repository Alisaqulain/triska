'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const footerLinks = {
    shop: ['Saree', 'Suit', 'Kurti', 'Accessories'],
    help: ['Contact Us', 'Shipping Info', 'Returns', 'Size Guide'],
    about: ['Our Story', 'Careers', 'Sustainability', 'Press'],
    connect: ['Instagram', 'Facebook', 'Twitter', 'Pinterest'],
  }

  return (
    <footer className="bg-gradient-to-b from-cream-50 to-beige-100 border-t border-beige-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Trisaka Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-serif font-bold text-gray-800">
                Trisaka
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Discover elegance and luxury in every piece. Trisaka brings you
              premium women&apos;s fashion that celebrates your unique style
              with timeless designs and exceptional quality.
            </p>
            <div className="flex space-x-4">
              {['Instagram', 'Facebook', 'Twitter', 'Pinterest'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white border border-beige-300 flex items-center justify-center text-gray-600 hover:text-gold-500 hover:border-gold-400 transition-colors duration-200"
                  aria-label={social}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-serif font-semibold text-gray-800 mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gold-500 text-sm transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-beige-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Trisaka. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-600">
            <Link href="#" className="hover:text-gold-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gold-500 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-gold-500 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

