// Local storage utilities for products and orders
// In production, replace with API calls to backend

export function getProducts(filters = {}) {
  if (typeof window === 'undefined') return []
  const products = localStorage.getItem('trisaka_products')
  if (!products) {
    // Initialize with default products
    const defaultProducts = [
      {
        id: 1,
        name: 'Elegant Silk Saree',
        category: 'Saree',
        ageGroup: '26-35',
        price: 8999,
        originalPrice: 12999,
        discount: 31,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=667&fit=crop',
        fabric: 'Silk',
        occasion: 'Wedding',
        stock: 50,
        description: 'Beautiful silk saree with intricate designs',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'Designer Suit Set',
        category: 'Suit',
        ageGroup: '18-25',
        price: 5999,
        originalPrice: 7999,
        discount: 25,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=667&fit=crop',
        fabric: 'Cotton',
        occasion: 'Casual',
        stock: 30,
        description: 'Comfortable and stylish suit set',
        createdAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem('trisaka_products', JSON.stringify(defaultProducts))
    return defaultProducts
  }
  try {
    return JSON.parse(products)
  } catch {
    return []
  }
}

export function saveProducts(products) {
  if (typeof window === 'undefined') return
  localStorage.setItem('trisaka_products', JSON.stringify(products))
}

export function addProduct(product) {
  const products = getProducts()
  const newProduct = {
    ...product,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  }
  products.push(newProduct)
  saveProducts(products)
  return newProduct
}

export function updateProduct(id, updates) {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null
  products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() }
  saveProducts(products)
  return products[index]
}

export function deleteProduct(id) {
  const products = getProducts()
  const filtered = products.filter((p) => p.id !== id)
  saveProducts(filtered)
  return true
}

export function getOrders() {
  if (typeof window === 'undefined') return []
  const orders = localStorage.getItem('trisaka_orders')
  if (!orders) return []
  try {
    return JSON.parse(orders)
  } catch {
    return []
  }
}

export function saveOrders(orders) {
  if (typeof window === 'undefined') return
  localStorage.setItem('trisaka_orders', JSON.stringify(orders))
}

export function addOrder(order) {
  const orders = getOrders()
  const newOrder = {
    ...order,
    id: Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  orders.push(newOrder)
  saveOrders(orders)
  return newOrder
}

export function updateOrderStatus(id, status) {
  const orders = getOrders()
  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return null
  orders[index] = {
    ...orders[index],
    status,
    updatedAt: new Date().toISOString(),
  }
  saveOrders(orders)
  return orders[index]
}



