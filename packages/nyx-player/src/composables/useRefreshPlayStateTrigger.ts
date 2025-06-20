import { onUnmounted } from 'vue'
import { emitter, REFRESH_PLAY_STATE_EVENT } from '@/utils/constants'

export function useRefreshPlayStateTrigger() {
  const trigger = () => emitter.emit(REFRESH_PLAY_STATE_EVENT)

  const onTrigger = (handler: () => void) => {
    emitter.on(REFRESH_PLAY_STATE_EVENT, handler)
    onUnmounted(() => emitter.off(REFRESH_PLAY_STATE_EVENT, handler))
  }

  return { trigger, onTrigger }
}
