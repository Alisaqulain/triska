'use client'

import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAdmin } from '@/contexts/AdminContext'
import Image from 'next/image'
import Link from 'next/link'

export default function AdminNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { admin, logout } = useAdmin()

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '👗' },
    { href: '/admin/banarasi', label: 'Banarasi', icon: '✨' },
    { href: '/admin/orders', label: 'Orders', icon: '📦' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <nav className="bg-white border-b border-beige-200 shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Trisaka Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif font-bold text-gray-800">Admin Panel</span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-gold-100 text-gold-700'
                    : 'text-gray-600 hover:bg-cream-100 hover:text-gray-800'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{admin?.email}</span>
            <motion.button
              onClick={() => {
                logout()
                router.push('/')
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  )
}



