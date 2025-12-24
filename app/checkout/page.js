'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { useUser } from '@/contexts/UserContext'
import { addOrder } from '@/lib/storage'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart()
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'card',
  })

  const subtotal = getCartTotal()
  const shipping = subtotal > 2999 ? 0 : 99
  const total = subtotal + shipping

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Create order
    const order = {
      items: cart,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      paymentMethod: formData.paymentMethod,
      subtotal,
      shipping,
      total,
      status: 'pending',
    }

    addOrder(order)
    clearCart()
    
    // Redirect to payment page
    router.push(`/payment?orderId=${Date.now()}`)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-gold-400 to-gold-500 text-white px-8 py-3 rounded-full font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <div className="bg-white rounded-2xl shadow-soft p-6">
                  <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-soft p-6">
                  <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    {['card', 'upi', 'cod'].map((method) => (
                      <label
                        key={method}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.paymentMethod === method
                            ? 'border-gold-400 bg-gold-50'
                            : 'border-beige-300 hover:border-gold-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="text-gold-500 focus:ring-gold-400"
                        />
                        <span className="ml-3 font-medium text-gray-800 capitalize">
                          {method === 'card' ? 'Credit/Debit Card' : method === 'upi' ? 'UPI' : 'Cash on Delivery'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
                  <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">
                    Order Summary
                  </h2>
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-semibold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-beige-200 pt-4 space-y-2 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600 font-semibold">Free</span>
                        ) : (
                          `₹${shipping}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-beige-200">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-gold-400 to-gold-500 text-white py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </motion.button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}


