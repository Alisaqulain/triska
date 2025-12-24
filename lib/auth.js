// Simple authentication utility
// In production, this should connect to a proper backend

const ADMIN_EMAIL = 'admin@trisaka.com'
const ADMIN_PASSWORD = 'admin123' // Change this in production!

export function loginAdmin(email, password) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const adminData = {
      email: ADMIN_EMAIL,
      name: 'Admin',
      role: 'admin',
      loginTime: new Date().toISOString(),
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminAuth', JSON.stringify(adminData))
    }
    return { success: true, data: adminData }
  }
  return { success: false, error: 'Invalid credentials' }
}

export function logoutAdmin() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminAuth')
  }
}

export function getAdminAuth() {
  if (typeof window === 'undefined') return null
  const auth = localStorage.getItem('adminAuth')
  if (!auth) return null
  try {
    return JSON.parse(auth)
  } catch {
    return null
  }
}

export function isAdminAuthenticated() {
  const auth = getAdminAuth()
  return auth !== null
}


