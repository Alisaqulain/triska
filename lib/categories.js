// Category and SubCategory management
// In production, replace with API calls

export function getCategories() {
  if (typeof window === 'undefined') return []
  const categories = localStorage.getItem('trisaka_categories')
  if (!categories) {
    // Initialize with default categories including Banarasi
    const defaultCategories = [
      {
        id: 1,
        name: 'Banarasi',
        slug: 'banarasi',
        subCategories: [
          { id: 1, name: 'Banarasi Saree', slug: 'saree' },
          { id: 2, name: 'Banarasi Suit', slug: 'suit' },
          { id: 3, name: 'Banarasi Dupatta', slug: 'dupatta' },
          { id: 4, name: 'Banarasi Lehenga', slug: 'lehenga' },
          { id: 5, name: 'Other Banarasi Products', slug: 'other' },
        ],
        createdAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem('trisaka_categories', JSON.stringify(defaultCategories))
    return defaultCategories
  }
  try {
    return JSON.parse(categories)
  } catch {
    return []
  }
}

export function saveCategories(categories) {
  if (typeof window === 'undefined') return
  localStorage.setItem('trisaka_categories', JSON.stringify(categories))
}

export function getCategoryBySlug(slug) {
  const categories = getCategories()
  return categories.find(c => c.slug === slug)
}

export function getSubCategoryBySlug(categorySlug, subCategorySlug) {
  const category = getCategoryBySlug(categorySlug)
  if (!category) return null
  return category.subCategories.find(sc => sc.slug === subCategorySlug)
}

export function addCategory(category) {
  const categories = getCategories()
  const newCategory = {
    ...category,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  }
  categories.push(newCategory)
  saveCategories(categories)
  return newCategory
}

export function updateCategory(id, updates) {
  const categories = getCategories()
  const index = categories.findIndex(c => c.id === id)
  if (index === -1) return null
  categories[index] = { ...categories[index], ...updates, updatedAt: new Date().toISOString() }
  saveCategories(categories)
  return categories[index]
}

export function deleteCategory(id) {
  const categories = getCategories()
  const filtered = categories.filter(c => c.id !== id)
  saveCategories(filtered)
  return true
}

export function addSubCategory(categoryId, subCategory) {
  const categories = getCategories()
  const categoryIndex = categories.findIndex(c => c.id === categoryId)
  if (categoryIndex === -1) return null
  
  const newSubCategory = {
    ...subCategory,
    id: Date.now(),
  }
  
  if (!categories[categoryIndex].subCategories) {
    categories[categoryIndex].subCategories = []
  }
  
  categories[categoryIndex].subCategories.push(newSubCategory)
  saveCategories(categories)
  return newSubCategory
}

export function updateSubCategory(categoryId, subCategoryId, updates) {
  const categories = getCategories()
  const categoryIndex = categories.findIndex(c => c.id === categoryId)
  if (categoryIndex === -1) return null
  
  const subCategoryIndex = categories[categoryIndex].subCategories.findIndex(sc => sc.id === subCategoryId)
  if (subCategoryIndex === -1) return null
  
  categories[categoryIndex].subCategories[subCategoryIndex] = {
    ...categories[categoryIndex].subCategories[subCategoryIndex],
    ...updates,
  }
  saveCategories(categories)
  return categories[categoryIndex].subCategories[subCategoryIndex]
}

export function deleteSubCategory(categoryId, subCategoryId) {
  const categories = getCategories()
  const categoryIndex = categories.findIndex(c => c.id === categoryId)
  if (categoryIndex === -1) return false
  
  categories[categoryIndex].subCategories = categories[categoryIndex].subCategories.filter(
    sc => sc.id !== subCategoryId
  )
  saveCategories(categories)
  return true
}

