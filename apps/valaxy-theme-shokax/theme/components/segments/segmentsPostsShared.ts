import type { PostFrontMatter } from 'valaxy'

/**
 * Segment list category entry mapped from Valaxy frontmatter categories.
 */
export interface SegmentCategory {
  id: string
  name: string
  path: string
}

/**
 * Normalized post shape consumed by Segments components.
 */
export interface SegmentPost {
  id: string
  title: string
  link: string
  cover: string
  date: Date
  description?: string
  excerpt?: string
  content?: string
  categories: SegmentCategory[]
  wordCount: number
  minutes: number
}

/**
 * Deterministic placeholder cover based on a seed string.
 */
function fallbackCover(seed: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/450`
}

/**
 * Remove HTML tags from a string, used for estimating word count.
 */
const stripHtml = (input?: string) => input?.replace(/<[^>]*>/g, '') ?? ''

const isString = (value: unknown): value is string => typeof value === 'string'
function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number')
    return value
  return undefined
}

/**
 * Heuristic to estimate word count for reading time when not provided.
 */
function estimateWordCount(content: string) {
  const text = stripHtml(content).trim()
  if (!text)
    return 600
  const words = text.split(/\s+/).length
  return Math.max(words, 200)
}

/**
 * Compute reading time (minutes) with a default WPM.
 */
const readingTime = (wordCount: number, wpm = 300) => Math.max(1, Math.round(wordCount / wpm))

/**
 * URL-friendly slug for category fallback paths.
 */
function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Stable gradient derived from post id so colors stay consistent across renders.
 */
function seededGradient(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++)
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  const hue1 = hash % 360
  const hue2 = (hash >> 3) % 360
  return `linear-gradient(135deg, hsl(${hue1}, 75%, 65%), hsl(${hue2}, 70%, 60%))`
}

/**
 * Normalize a Valaxy frontmatter object into the SegmentPost shape used by Segments components.
 * Falls back to generated ids, covers, categories, word count, and reading time when missing.
 */
export function normalizePost(post: Partial<PostFrontMatter>, index = 0): SegmentPost {
  const idSource = post.abbrlink ?? post.id ?? post.path ?? post.title ?? `post-${index + 1}`
  const id = String(idSource)

  let link = '#'
  if (post.path) {
    link = post.path
  }
  else if (post.abbrlink) {
    link = `/p/${post.abbrlink}`
  }

  let date = new Date()
  if (post.date)
    date = new Date(post.date)

  let description = ''
  if (isString(post.description))
    description = post.description

  let excerpt = description
  if (isString(post.excerpt))
    excerpt = post.excerpt

  let content = ''
  const contentCandidate = (post as PostFrontMatter).content
  if (isString(contentCandidate))
    content = contentCandidate

  let cover = fallbackCover(id)
  if (isString(post.cover) && post.cover.length)
    cover = post.cover

  const providedWordCount = asNumber((post as PostFrontMatter).wordCount)
  let resolvedWordCount = providedWordCount
  if (resolvedWordCount === undefined)
    resolvedWordCount = estimateWordCount(excerpt || description || content)

  const providedMinutes = asNumber((post as PostFrontMatter).readingTime)
  let minutes = readingTime(resolvedWordCount)
  if (providedMinutes !== undefined)
    minutes = Math.max(1, Math.round(providedMinutes))

  const categoriesRaw = post.categories
  const categoryList: unknown[] = []
  if (Array.isArray(categoriesRaw))
    categoryList.push(...categoriesRaw)
  else if (categoriesRaw)
    categoryList.push(categoriesRaw)

  const categories: SegmentCategory[] = []
  if (categoryList.length) {
    categoryList.forEach((cat, catIndex) => {
      if (isString(cat)) {
        const slug = slugify(cat)
        categories.push({ id: `${id}-cat-${catIndex}`, name: cat, path: `/categories/${slug}/` })
        return
      }

      const candidate = cat as Record<string, unknown>
      let name = String(cat)
      if (isString(candidate.name))
        name = candidate.name

      let path = `/categories/${slugify(name)}/`
      if (isString(candidate.path))
        path = candidate.path

      let categoryId = `${id}-cat-${catIndex}`
      if (isString(candidate.id))
        categoryId = candidate.id

      categories.push({ id: categoryId, name, path })
    })
  }
  else {
    categories.push({ id: `${id}-cat-0`, name: 'General', path: '#' })
  }

  let title = 'Untitled'
  if (isString(post.title)) {
    title = post.title
  }
  else if (post.title && typeof post.title === 'object') {
    const titleRecord = post.title as Record<string, string>
    if (titleRecord['zh-CN'])
      title = titleRecord['zh-CN']
    else if (titleRecord.en)
      title = titleRecord.en
  }

  return {
    id,
    title,
    link,
    cover,
    date,
    description,
    excerpt,
    content,
    categories,
    wordCount: resolvedWordCount,
    minutes,
  }
}

export function normalizePosts(posts: Partial<PostFrontMatter>[] | undefined | null): SegmentPost[] {
  if (!Array.isArray(posts))
    return []
  return posts.map((post, index) => normalizePost(post, index))
}

/**
 * Get seeded gradient background for a normalized post.
 */
export function gradientForPost(post: SegmentPost) {
  return seededGradient(post.id)
}
