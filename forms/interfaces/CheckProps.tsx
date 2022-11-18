import { Control, NestDataObject, FieldError } from 'react-hook-form'

export interface CheckProps {
  field: {
    label: string,
    name: string,
  }
  onChange: boolean,
  control?: Control,
  errors?: NestDataObject<Record<string, any>, FieldError>,
}