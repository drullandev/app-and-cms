import React from 'react'
export interface ModalProps {
  show: boolean  
  component?: Function
  timestamp: number
  children?: React.ReactNode
  presenting: any
}