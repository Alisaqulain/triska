// User authentication utilities
// In production, connect to backend API

export function registerUser(name, email, password) {
  if (typeof window === 'undefined') return { success: false, error: 'Not available' }
  
  // Check if user already exists
  const users = getUsers()
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Email already registered' }
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password, // In production, hash this!
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  localStorage.setItem('trisaka_users', JSON.stringify(users))
  
  return { success: true, user: { id: newUser.id, name, email } }
}

export function loginUser(email, password) {
  if (typeof window === 'undefined') return { success: false, error: 'Not available' }
  
  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    return { success: false, error: 'Invalid email or password' }
  }

  const session = {
    userId: user.id,
    email: user.email,
    name: user.name,
    loginTime: new Date().toISOString(),
  }
  
  localStorage.setItem('userSession', JSON.stringify(session))
  return { success: true, user: { id: user.id, name: user.name, email: user.email } }
}

export function logoutUser() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('userSession')
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null
  const session = localStorage.getItem('userSession')
  if (!session) return null
  try {
    return JSON.parse(session)
  } catch {
    return null
  }
}

export function isUserLoggedIn() {
  return getCurrentUser() !== null
}

function getUsers() {
  if (typeof window === 'undefined') return []
  const users = localStorage.getItem('trisaka_users')
  if (!users) return []
  try {
    return JSON.parse(users)
  } catch {
    return []
  }
}



