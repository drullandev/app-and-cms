import * as icon from 'ionicons/icons'

interface OutputType {
  message: string
  duration?: number
  color?: string
  icon?: any
}

export const setOutput = (output: OutputType) =>{
  return {
    message: output.message,
    duration: output?.duration ?? 1500,
    color: output?.color ?? 'warning',
    icon: output?.icon ?? icon.closeCircleOutline,
  }
}
