import type { LyricLine } from './lrc'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Lyric, parseLyricLine } from './lrc'

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

describe('lyric class', () => {
  let lyric: Lyric
  const mockContent = `[00:01.00]First line\n[00:05.00]Second line\n`

  beforeEach(() => {
    lyric = new Lyric('https://example.com/lyric.lrc')
  })

  it('fetchLyric stores fetched content', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(mockContent),
      }),
    ) as any

    await lyric.fetchLyric()
    expect(lyric.rawContent).toBe(mockContent)
  })

  it('parseLyric correctly parses lyric lines', () => {
    lyric.rawContent = mockContent
    lyric.parseLyric()
    const expected: LyricLine[] = [
      { text: 'First line', start: 1.0, end: 5.0 },
      { text: 'Second line', start: 5.0, end: Infinity },
    ]
    expect(lyric.lyrics).toEqual(expected)
  })
})

describe('lyric.parseLyric edge cases', () => {
  it('handles empty lines', () => {
    const lyric = new Lyric('https://example.com/lyric.lrc')
    lyric.rawContent = `[00:01.00]Line one\n\n[00:05.00]Line two\n`
    expect(() => lyric.parseLyric()).toBeTruthy()
  })

  it('handles duplicate timestamps', () => {
    const lyric = new Lyric('https://example.com/lyric.lrc')
    lyric.rawContent = `[00:01.00]First time\n[00:01.00]Duplicate time\n[00:03.00]Next line\n`
    lyric.parseLyric()
    expect(lyric.lyrics).toEqual([
      { text: 'First time', start: 1.0, end: 1.0 },
      { text: 'Duplicate time', start: 1.0, end: 3.0 },
      { text: 'Next line', start: 3.0, end: Infinity },
    ])
  })
})
