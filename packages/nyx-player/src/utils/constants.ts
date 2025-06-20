import mitt from 'mitt'

export const METING_API = 'https://api.injahow.cn/meting/'

// Event symbols
export const REFRESH_PLAY_STATE_EVENT = Symbol('refresh-play-state')

export const emitter = mitt()
