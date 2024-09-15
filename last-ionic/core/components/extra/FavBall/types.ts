export interface FavProps {
  show: boolean
  style?: {
    class?: string
    icon?: string
    slot?: string        
    color?: string
    vertical?: 'top' | 'bottom' | 'center'
    horizontal?: 'start' | 'end'
  },
  onClick?: Function
}