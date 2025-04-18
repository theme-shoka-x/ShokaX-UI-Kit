import type { Post } from './types'

export interface ArchiveConfig {
  daily?: boolean
}

export interface StructuredPosts {
  [year: number]: Array<PostWithDay[]> & { [month: number]: PostWithDay[] & { day?: Record<number, PostWithDay[]> } }
}

type PostWithDay = Post

export function structurePostsByDate(posts: Post[], config: ArchiveConfig = {}): StructuredPosts {
  const grouped: StructuredPosts = {}

  posts.forEach((post) => {
    const date = post.date
    const year = date.getFullYear()
    const month = date.getMonth() + 1 // month starts from 0
    const day = date.getDate()

    if (!grouped[year]) {
      grouped[year] = Array.from({ length: 13 }, () => []) as any
    }

    grouped[year][0].push(post)
    grouped[year][month].push(post)

    if (config.daily) {
      if (!grouped[year][month].day) {
        grouped[year][month].day = {}
      }

      if (!grouped[year][month].day![day]) {
        grouped[year][month].day![day] = []
      }

      grouped[year][month].day![day].push(post)
    }
  })

  return grouped
}
