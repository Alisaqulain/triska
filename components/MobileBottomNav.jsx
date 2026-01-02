'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { getCartCount } = useCart()
  const { wishlistCount } = useWishlist()

  const navItems = [
    { href: '/', icon: '🏠', label: 'Home' },
    { href: '/products', icon: '👗', label: 'Shop' },
    { href: '/banarasi', icon: '✨', label: 'Banarasi' },
    { href: '/wishlist', icon: '❤️', label: 'Wishlist', badge: wishlistCount },
    { href: '/cart', icon: '🛒', label: 'Cart', badge: getCartCount() },
  ]

  // Hide on admin pages and auth pages
  if (pathname?.startsWith('/admin') || pathname === '/login' || pathname === '/signup') {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-beige-200 shadow-soft lg:hidden z-40">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 relative ${
                isActive ? 'text-maroon-600' : 'text-gray-600'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge > 0 && (
                <span className="absolute top-0 right-1/4 bg-maroon-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

