import { Control, NestDataObject, FieldError } from 'react-hook-form'
export interface InputProps {
  name: string
  label?: string
  control?: Control
  component?: JSX.Element
  errors?: NestDataObject<Record<string, any>, FieldError>
}