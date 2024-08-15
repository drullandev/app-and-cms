export interface AlertProps {
  show: boolean
  style: string
  header: string
  subHeader?: string
  message: string
  buttons: any[]
  timestamp: string
}