'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your fashion assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const { getCartCount } = useCart()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const responses = {
    greeting: [
      "Hello! Welcome to Trisaka. How can I assist you today?",
      "Hi there! I'm here to help you find the perfect fashion pieces.",
      "Welcome! What can I help you with?",
    ],
    products: [
      "We have a beautiful collection of Sarees, Suits, Kurtis, and Accessories. Would you like to see a specific category?",
      "You can browse our products by category: Saree, Suit, Kurti, or Accessories. What interests you?",
    ],
    cart: [
      `You have ${getCartCount()} item(s) in your cart. Would you like to view your cart?`,
      `Your cart currently has ${getCartCount()} item(s).`,
    ],
    shipping: [
      "We offer free shipping on orders above ₹2999. For orders below that, shipping is ₹99. Standard delivery takes 5-7 business days.",
    ],
    returns: [
      "We have a 30-day return policy. Items must be unworn and in original packaging. You can initiate a return from your order page.",
    ],
    size: [
      "Each product page includes a detailed size guide. You can also visit our Size Guide page for general measurements.",
    ],
    payment: [
      "We accept Credit/Debit Cards, UPI, and Cash on Delivery (COD). All payments are secure and encrypted.",
    ],
    default: [
      "I'm here to help! You can ask me about our products, shipping, returns, sizes, or anything else. How can I assist you?",
      "That's a great question! Let me help you with that. Could you provide more details?",
    ],
  }

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
    }
    if (lowerMessage.includes('product') || lowerMessage.includes('item') || lowerMessage.includes('collection')) {
      return responses.products[Math.floor(Math.random() * responses.products.length)]
    }
    if (lowerMessage.includes('cart') || lowerMessage.includes('basket')) {
      return responses.cart[Math.floor(Math.random() * responses.cart.length)]
    }
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || lowerMessage.includes('ship')) {
      return responses.shipping[0]
    }
    if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('exchange')) {
      return responses.returns[0]
    }
    if (lowerMessage.includes('size') || lowerMessage.includes('fit') || lowerMessage.includes('measurement')) {
      return responses.size[0]
    }
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('cod')) {
      return responses.payment[0]
    }
    
    return responses.default[Math.floor(Math.random() * responses.default.length)]
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: getResponse(input),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 500)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-elegant z-50 flex flex-col"
          >
            <div className="bg-gradient-to-r from-gold-400 to-gold-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  💬
                </div>
                <div>
                  <h3 className="font-semibold">Trisaka Assistant</h3>
                  <p className="text-xs text-white/90">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-gold-400 text-white'
                        : 'bg-cream-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-beige-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold-400 text-white px-4 py-2 rounded-lg hover:bg-gold-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-gold-400 to-gold-500 text-white rounded-full shadow-elegant z-40 flex items-center justify-center text-2xl"
        aria-label="Open chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>
    </>
  )
}

