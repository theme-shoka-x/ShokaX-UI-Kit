import type { Category } from './types'

interface FormatCategoriesOptions {
  depth?: number
}

interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[]
}

export function formatCategories(categories: Category[], options: Partial<FormatCategoriesOptions> = {}) {
  const { depth = Infinity } = options
  const categoryMap = new Map<
    Category['_id'],
    CategoryWithChildren
  >()

  categories.forEach((cat) => {
    categoryMap.set(cat._id, {
      ...cat,
      children: [],
      posts: Array.isArray(cat.posts) ? [...cat.posts] : [],
    })
  })

  const roots: CategoryWithChildren[] = []

  categoryMap.forEach((cat) => {
    if (cat.parent && categoryMap.has(cat.parent)) {
      categoryMap.get(cat.parent)?.children?.push(cat)
    }
    else {
      roots.push(cat)
    }
  })

  const limitAndSort = (nodes?: CategoryWithChildren[], level = 0): CategoryWithChildren[] => {
    if (!nodes || nodes.length === 0)
      return []
    if (level >= depth)
      return []

    return nodes
      .sort((a, b) => b.length - a.length) // 按 length 降序
      .map(node => ({
        ...node,
        children: limitAndSort(node.children, level + 1),
      }))
  }

  return limitAndSort(roots)
}
