'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AdminNavbar from '@/components/AdminNavbar'
import AdminProtected from '@/components/AdminProtected'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Trisaka',
    siteEmail: 'admin@trisaka.com',
    maintenanceMode: false,
  })

  const handleSave = () => {
    // In production, save to backend
    alert('Settings saved successfully!')
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-cream-50">
        <AdminNavbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-8">
            Settings
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-soft p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Email
              </label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-cream-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-800">Maintenance Mode</div>
                <div className="text-sm text-gray-600">
                  Enable to temporarily disable the site
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    setSettings({ ...settings, maintenanceMode: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-beige-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-beige-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
              </label>
            </div>

            <div className="pt-4 border-t border-beige-200">
              <motion.button
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-gold-400 to-gold-500 text-white px-8 py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all"
              >
                Save Settings
              </motion.button>
            </div>
          </motion.div>

          <div className="mt-8 bg-white rounded-2xl shadow-soft p-8">
            <h2 className="font-serif text-2xl font-bold text-gray-800 mb-4">
              Admin Account Info
            </h2>
            <div className="space-y-3 text-gray-600">
              <div>
                <span className="font-medium">Email:</span> admin@trisaka.com
              </div>
              <div>
                <span className="font-medium">Default Password:</span> admin123
              </div>
              <div className="text-sm text-gray-500 mt-4">
                ⚠️ Change the default password in production!
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminProtected>
  )
}


