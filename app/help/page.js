'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function HelpPage() {
  const [openSection, setOpenSection] = useState(null)

  const faqs = [
    {
      category: 'Shipping',
      questions: [
        {
          q: 'What are the shipping charges?',
          a: 'Shipping is free for orders above ₹2999. For orders below ₹2999, a flat shipping charge of ₹99 applies.',
        },
        {
          q: 'How long does delivery take?',
          a: 'Standard delivery takes 5-7 business days. Express delivery (2-3 days) is available for an additional charge.',
        },
        {
          q: 'Do you ship internationally?',
          a: 'Currently, we ship only within India. International shipping will be available soon.',
        },
      ],
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 30-day return policy. Items must be unworn, unwashed, and in original packaging with tags attached.',
        },
        {
          q: 'How do I return an item?',
          a: 'You can initiate a return from your order page. We will provide a prepaid return label. Once we receive the item, your refund will be processed within 5-7 business days.',
        },
        {
          q: 'Can I exchange an item for a different size?',
          a: 'Yes, you can exchange items for a different size within 30 days of delivery, subject to availability.',
        },
      ],
    },
    {
      category: 'Orders',
      questions: [
        {
          q: 'How can I track my order?',
          a: 'You can track your order using the Order ID provided in your confirmation email. Visit the Track Order page and enter your Order ID.',
        },
        {
          q: 'Can I modify or cancel my order?',
          a: 'You can cancel your order within 24 hours of placing it. After that, please contact our support team.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept Credit/Debit Cards, UPI, and Cash on Delivery (COD).',
        },
      ],
    },
    {
      category: 'Products',
      questions: [
        {
          q: 'How do I know my size?',
          a: 'Each product page includes a detailed size guide. You can also refer to our Size Guide page for general measurements.',
        },
        {
          q: 'Are the products authentic?',
          a: 'Yes, all our products are 100% authentic and sourced directly from verified manufacturers.',
        },
        {
          q: 'Do you offer customization?',
          a: 'Currently, we offer limited customization options. Please contact our support team for specific requests.',
        },
      ],
    },
  ]

  const helpTopics = [
    { icon: '📦', title: 'Track Order', description: 'Track your order status', link: '/track-order' },
    { icon: '↩️', title: 'Returns', description: 'Return or exchange items', link: '/returns' },
    { icon: '💳', title: 'Payment', description: 'Payment & billing help', link: '/help#payment' },
    { icon: '🚚', title: 'Shipping', description: 'Delivery information', link: '/help#shipping' },
    { icon: '📏', title: 'Size Guide', description: 'Find your perfect fit', link: '/size-guide' },
    { icon: '💬', title: 'Contact Us', description: 'Get in touch with us', link: '/contact' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              How Can We Help?
            </h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions or contact our support team
            </p>
          </motion.div>

          {/* Help Topics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {helpTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={topic.link}
                  className="block bg-white rounded-2xl shadow-soft p-6 text-center hover:shadow-elegant transition-all"
                >
                  <div className="text-4xl mb-3">{topic.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{topic.title}</h3>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            {faqs.map((section, sectionIndex) => (
              <div key={section.category} className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4">
                  {section.category}
                </h3>
                <div className="space-y-3">
                  {section.questions.map((faq, index) => (
                    <div key={index} className="border-b border-beige-200 last:border-0 pb-3 last:pb-0">
                      <button
                        onClick={() =>
                          setOpenSection(
                            openSection === `${sectionIndex}-${index}`
                              ? null
                              : `${sectionIndex}-${index}`
                          )
                        }
                        className="w-full text-left flex items-center justify-between py-2"
                      >
                        <span className="font-semibold text-gray-800">{faq.q}</span>
                        <svg
                          className={`w-5 h-5 text-gray-600 transition-transform ${
                            openSection === `${sectionIndex}-${index}` ? 'rotate-180' : ''
                          }`}
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
                        </svg>
                      </button>
                      {openSection === `${sectionIndex}-${index}` && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-gray-600 mt-2"
                        >
                          {faq.a}
                        </motion.p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-gold-400 to-gold-500 rounded-2xl p-8 text-center text-white"
          >
            <h3 className="font-serif text-2xl font-bold mb-2">
              Still need help?
            </h3>
            <p className="mb-6">Our support team is here to assist you</p>
            <Link
              href="/contact"
              className="inline-block bg-white text-gold-600 px-8 py-3 rounded-full font-semibold hover:bg-cream-50 transition-colors"
            >
              Contact Support
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}



