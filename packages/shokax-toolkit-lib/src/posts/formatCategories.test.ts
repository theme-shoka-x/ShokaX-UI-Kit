import { describe, expect, it } from 'vitest'
import { formatCategories } from './formatCategories'

describe('formatCategories', () => {
  const post1 = { _id: 'p1', title: '文章一', content: '内容一', date: new Date() }
  const post2 = { _id: 'p2', title: '文章二', content: '内容二', date: new Date() }
  const post3 = { _id: 'p3', title: '文章三', content: '内容三', date: new Date() }
  const post4 = { _id: 'p4', title: '文章四', content: '内容四', date: new Date() }
  const post5 = { _id: 'p5', title: '文章五', content: '内容五', date: new Date() }
  const post6 = { _id: 'p6', title: '文章六', content: '内容六', date: new Date() }

  const sampleCategories = [
    { _id: '1', name: '前端', length: 5, posts: [post1, post2, post3, post4, post5] },
    { _id: '2', name: 'React', parent: '1', length: 3, posts: [post1, post2, post3] },
    { _id: '3', name: 'Vue', parent: '1', length: 2, posts: [post4, post5] },
    { _id: '4', name: '后端', length: 6, posts: [post1, post2, post3, post4, post5, post6] },
    { _id: '5', name: 'Node.js', parent: '4', length: 4, posts: [post1, post2, post3, post4] },
  ]

  it('should format categories into tree structure', () => {
    const result = formatCategories(sampleCategories)

    expect(result).toHaveLength(2) // 顶级分类：前端 + 后端
    expect(result[0].name).toBe('后端') // 因为 length 最大，排在最前
    expect(result[1].name).toBe('前端')

    expect(result[0].children[0].name).toBe('Node.js')
    expect(result[1].children.map(c => c.name)).toEqual(['React', 'Vue'])
  })

  it('should respect depth limit', () => {
    const result = formatCategories(sampleCategories, { depth: 1 })

    expect(result).toHaveLength(2)
    expect(result[0].children).toEqual([])
    expect(result[1].children).toEqual([])
  })

  it('should include posts in each category', () => {
    const result = formatCategories(sampleCategories)
    expect(result[0].posts).toEqual([post1, post2, post3, post4, post5, post6])
    expect(result[0].children[0].posts).toEqual([post1, post2, post3, post4])
  })

  it('should handle empty input', () => {
    const result = formatCategories([])
    expect(result).toEqual([])
  })
})
