import type { Song } from '../audioType'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { METING_API } from '../constants'
import { PlayList } from './playlist'

const mockSongs: Song[] = [
  {
    name: 'Song 1',
    artist: 'Artist A',
    url: 'https://example.com/song1.mp3',
    pic: 'https://example.com/image1.jpg',
    lrc: '[00:00.00] 歌词第一行\n[00:10.00] 歌词第二行',
  },
  {
    name: 'Song 2',
    artist: 'Artist B',
    url: 'https://example.com/song2.mp3',
    pic: 'https://example.com/image2.jpg',
    lrc: '[00:00.00] 歌词开始\n[00:15.00] 歌词继续',
  },
  {
    name: 'Song 3',
    artist: 'Artist C',
    url: 'https://example.com/song3.mp3',
    pic: 'https://example.com/image3.jpg',
    lrc: '[00:00.00] 起始歌词\n[00:20.00] 下一句歌词',
  },
]

describe('playList', () => {
  let playlist: PlayList

  beforeEach(() => {
    playlist = new PlayList('https://music.163.com/#/playlist?id=123456', 'My Playlist')
  })

  it('should parse a valid NetEase playlist URL', () => {
    const result = playlist.parserURL()
    expect(result).toEqual({
      id: '123456',
      provider: 'netease',
      type: 'playlist',
    })
    expect(playlist.accessibleURL).toEqual(result)
  })

  it('should throw error on unsupported URL', () => {
    playlist = new PlayList('https://unsupported.com')
    expect(() => playlist.parserURL()).toThrowError(/Unsupported URL/)
  })

  it('should fetch playlist from API', async () => {
    playlist.parserURL()

    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockSongs),
      }),
    )

    globalThis.fetch = fetchMock as unknown as typeof fetch

    await playlist.fetchPlaylist()
    expect(playlist.playlist).toEqual(mockSongs)
    expect(fetchMock).toHaveBeenCalledWith(
      `${METING_API}?type=playlist&id=123456&server=netease`,
      expect.objectContaining({
        headers: { Accept: 'application/json' },
        signal: expect.any(AbortSignal),
      }),
    )
  })

  describe('song navigation', () => {
    beforeEach(() => {
      playlist.playlist = [...mockSongs]
    })

    it('should get current song', () => {
      expect(playlist.getCurrentSong()).toEqual(mockSongs[0])
    })

    it('should go to next song', () => {
      playlist.index = 0
      expect(playlist.getNextSong()).toEqual(mockSongs[1])
      expect(playlist.index).toBe(1)
    })

    it('should go to previous song with wrap-around', () => {
      playlist.index = 0
      expect(playlist.getPrevSong()).toEqual(mockSongs[2])
      expect(playlist.index).toBe(2)
    })

    it('should get a random song and update index', () => {
      const song = playlist.getRandSong()
      expect(mockSongs).toContain(song)
      expect(playlist.index).toBeGreaterThanOrEqual(0)
      expect(playlist.index).toBeLessThan(mockSongs.length)
    })

    it('should get current song again for cycle', () => {
      playlist.index = 1
      expect(playlist.getCycleSong()).toEqual(mockSongs[1])
    })
  })
})
