import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PlayList } from '../utils/metingapi/playlist'
import { parse, usePlayingStore } from './usePlayingStore'

const sessionStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(globalThis, 'sessionStorage', {
  value: sessionStorageMock,
})

describe('usePlayingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    sessionStorageMock.clear()
  })

  it('initializes with default state', () => {
    const store = usePlayingStore()
    expect(store.playing).toBe(false)
    expect(store.showPlayer).toBe(false)
    expect(store.playlists).toEqual([])
  })

  it('start and paused actions work', () => {
    const store = usePlayingStore()
    store.start()
    expect(store.playing).toBe(true)
    store.paused()
    expect(store.playing).toBe(false)
  })

  it('toggle works correctly', () => {
    const store = usePlayingStore()
    store.toggle()
    expect(store.playing).toBe(true)
    store.toggle()
    expect(store.playing).toBe(false)
  })

  it('can set currentTime, and currentPlaylist', () => {
    const store = usePlayingStore()
    store.setCurrentTime(100)
    expect(store.currentTime).toBe(100)

    store.setCurrentPlaylist(1)
    expect(store.currentPlaylistIndex).toBe(1)
  })

  it('getCurrentPlaylist returns the correct playlist', () => {
    const store = usePlayingStore()
    const playlist = new PlayList('https://example.com', 'Test Playlist')
    store.playlists = [playlist]
    store.setCurrentPlaylist(0)
    expect(store.currentPlaylist).toEqual(playlist)
  })
})

describe('parse (store deserialization)', () => {
  it('converts plain playlist objects into PlayList instances', () => {
    const serialized = JSON.stringify({
      playlists: [{
        url: 'https://music.163.com/#/playlist?id=123456',
        playlist: [],
        index: 0,
        lastIdx: 0,
        name: 'Test Playlist',
        sIndex: 0,
        _type: 'playlist',
      }],
    })

    const result = parse(serialized)

    expect(Array.isArray(result.playlists)).toBe(true)
    expect(result.playlists[0]).toBeInstanceOf(PlayList)
    expect(result.playlists[0].name).toBe('Test Playlist')
    expect(typeof result.playlists[0].getCycleSong).toBe('function')
  })
})
