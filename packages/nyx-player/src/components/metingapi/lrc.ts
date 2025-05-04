export interface LyricLine {
  text: string
  start: number
  end: number
}

export function parseLyricLine(line: string) {
  const timePattern = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/
  const match = timePattern.exec(line) as RegExpExecArray

  if (!match) {
    throw new Error('Invalid lyric line format')
  }

  const min2sec = Number.parseInt(match[1]) * 60
  const sec2sec = Number.parseInt(match[2])
  const msec2sec = match[3] ? Number.parseInt(match[3]) / (match[3].length === 2 ? 100 : 1000) : 0

  return min2sec + sec2sec + msec2sec
}

export function parseLyric(lyric: string) {
  const lyrics = [] as LyricLine[]
  const lines = lyric.split('\n').filter(Boolean)

  const parsedLines = lines.map((line) => {
    const start = parseLyricLine(line)
    const text = line.replace(/\[.*?\]/, '').trim()
    return { start, text }
  })

  for (let i = 0; i < parsedLines.length; i++) {
    const { start, text } = parsedLines[i]
    const end = i === parsedLines.length - 1 ? Infinity : parsedLines[i + 1].start
    lyrics.push({ text, start, end })
  }

  return lyrics
}

export class MaximumMap<K, V> extends Map<K, V> {
  private maxSize: number

  constructor(maxSize: number) {
    super()
    this.maxSize = maxSize
  }

  set(key: K, value: V): this {
    if (this.size >= this.maxSize) {
      const firstKey = this.keys().next().value
      if (firstKey !== undefined) {
        this.delete(firstKey)
      }
    }
    return super.set(key, value)
  }
}