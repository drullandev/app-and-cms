import { Control, NestDataObject, FieldError } from 'react-hook-form'
export interface FormColProps {
  row: {
    id: number
    field?: {
      id: number
      slug: string
    }
    label: string
    name: string
    fieldType: string
    type: string
    required: boolean
  }
  control?: Control
  errors?: NestDataObject<Record<string, any>, FieldError>
}