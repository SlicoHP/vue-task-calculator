import { onMounted, onBeforeUnmount } from 'vue'
import { OPERATIONS } from './constants'

export function useKeyboardEvents({
  onEnterPress,
  onBackspacePress,
  onEscapePress,
  onNumberPress,
  onMathOperationPress,
  onNumberRelease
}: {
  onEnterPress: () => void
  onBackspacePress?: () => void
  onEscapePress: () => void
  onNumberPress: (number: string) => void,
  onMathOperationPress: (operation: string) => void,
  onNumberRelease?: (number: string) => void,
}) {
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Return') {
      onEnterPress()
      return
    }

    if (event.key === 'Escape') {
      onEscapePress()
      return
    }

    if (event.key === 'Backspace' && onBackspacePress) {
      onBackspacePress()
      return;
    }

    if(OPERATIONS.includes(event.key)){
      onMathOperationPress(event.key);
    }

    if (/^\d$/.test(event.key) || event.key === ".") {
      onNumberPress(event.key)
      return;
    }
  }

  function handleKeyUp(event: KeyboardEvent){
    if ((/^\d$/.test(event.key) || event.key === ".") && onNumberRelease) {
      onNumberRelease(event.key)
      return;
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('keyup', handleKeyUp)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyPress)
    window.removeEventListener('keyup', handleKeyUp)
  })
}
