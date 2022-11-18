//import { SubmitHandler } from 'react-hook-form'
export interface ButtonProps {
  label: string
  button: {
    name: string,
    type: string,
    label?: string,
    color?: string,
    routerLink?: string,
    //onClick?: SubmitHandler
  }
}

export type SpinnerProps = {
  type: string
  position: string
  display: boolean
}