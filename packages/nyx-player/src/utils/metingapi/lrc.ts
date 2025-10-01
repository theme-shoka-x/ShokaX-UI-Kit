export interface LyricLine {
  text: string
  start: number
  end: number
}

export function parseLyricLine(line: string) {
  const timePattern = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/
  const match = timePattern.exec(line) as RegExpExecArray

  if (!match || !match[1] || !match[2]) {
    throw new Error('Invalid lyric line format')
  }

  const min2sec = Number.parseInt(match[1]) * 60
  const sec2sec = Number.parseInt(match[2])

  function convertMillisecondsToSeconds(msecString?: string): number {
    if (!msecString) {
      return 0
    }

    const msec = Number.parseInt(msecString)
    if (msecString.length === 2) {
      return msec / 100
    }
    else {
      return msec / 1000
    }
  }

  const msec2sec = convertMillisecondsToSeconds(match[3])

  return min2sec + sec2sec + msec2sec
}

export function parseLyric(lyric: string) {
  const lyrics = [] as LyricLine[]
  const lines = lyric.split('\n').filter(Boolean)

  const parsedLines = lines.map((line) => {
    const start = parseLyricLine(line)
    const bracketStart = line.indexOf('[')
    const bracketEnd = line.indexOf(']')
    let text: string
    if (bracketStart !== -1 && bracketEnd !== -1) {
      text = line.substring(bracketEnd + 1).trim()
    }
    else {
      text = line.trim()
    }
    return { start, text }
  })

  for (let i = 0; i < parsedLines.length; i++) {
    const { start, text } = parsedLines[i] as LyricLine
    const end = i === parsedLines.length - 1 ? Infinity : (parsedLines[i + 1]?.start) ?? Infinity
    lyrics.push({ text, start, end })
  }

  return lyrics
}

export class MaximumMap<K, V> extends Map<K, V> {
  private readonly maxSize: number

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
