import { Control, NestDataObject, FieldError } from 'react-hook-form'

export interface Column {
  id: number,
  field: {
    id: number
    slug: string
    label?: string
    required?: boolean
    routeLink?: string
  }
}

export interface FormRowProps {
  columns: Column[]
  control?: Control
  errors?: NestDataObject<Record<string, any>, FieldError>
}
