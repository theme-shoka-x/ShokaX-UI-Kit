export interface Post {
  _id: string
  title: string
  content: string
  date: Date
}

export interface Category {
  _id: string
  name: string
  parent?: string
  posts: Post[]
  length: number
}
