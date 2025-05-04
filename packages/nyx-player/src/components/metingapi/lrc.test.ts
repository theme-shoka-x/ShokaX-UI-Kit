import { describe, expect, it } from 'vitest'
import { parseLyric, parseLyricLine } from './lrc'

describe('parseLyricLine', () => {
  it('parses [01:23.45] correctly', () => {
    expect(parseLyricLine('[01:23.45]')).toBeCloseTo(83.45)
  })

  it('parses [00:01.001] correctly', () => {
    expect(parseLyricLine('[00:01.001]')).toBeCloseTo(1.001)
  })

  it('parses [10:00] with no milliseconds', () => {
    expect(parseLyricLine('[10:00]')).toBe(600)
  })

  it('throws on invalid format', () => {
    expect(() => parseLyricLine('invalid line')).toThrow('Invalid lyric line format')
  })
})
describe('parseLyric', () => {
  it('parses a single lyric line correctly', () => {
    const input = '[00:10.00]Hello world'
    const result = parseLyric(input)
    expect(result).toEqual([
      { text: 'Hello world', start: 10, end: Infinity },
    ])
  })

  it('parses multiple lyric lines correctly', () => {
    const input = `[00:10.00]Hello world
[00:20.00]How are you`
    const result = parseLyric(input)
    expect(result).toEqual([
      { text: 'Hello world', start: 10, end: 20 },
      { text: 'How are you', start: 20, end: Infinity },
    ])
  })

  it('handles empty lines gracefully', () => {
    const input = `[00:10.00]Hello world

[00:20.00]How are you`
    const result = parseLyric(input)
    expect(result).toEqual([
      { text: 'Hello world', start: 10, end: 20 },
      { text: 'How are you', start: 20, end: Infinity },
    ])
  })

  it('throws an error for invalid lyric line format', () => {
    const input = `[00:10.00]Hello world
invalid line`
    expect(() => parseLyric(input)).toThrow('Invalid lyric line format')
  })

  it('parses lyrics with no milliseconds correctly', () => {
    const input = `[00:10]Hello world
[00:20]How are you`
    const result = parseLyric(input)
    expect(result).toEqual([
      { text: 'Hello world', start: 10, end: 20 },
      { text: 'How are you', start: 20, end: Infinity },
    ])
  })
})
