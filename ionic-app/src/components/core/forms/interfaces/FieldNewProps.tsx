import { Control, NestDataObject, FieldError } from 'react-hook-form'
export interface FieldNewProps {
  name: string
  label: string
  fieldType: string
  type: string
  slug: string
  required: boolean
  columns?: any[]
  control?: Control
  component?: JSX.Element
  errors?: NestDataObject<Record<string, any>, FieldError>,
  action?: Function
}