import { Control, NestDataObject, FieldError } from 'react-hook-form'
import Field from '../Field'
import { FieldNewProps } from './FieldNewProps'

export interface FormNewRowProps {
  fields: FieldNewProps[]
  control?: Control
  errors?: NestDataObject<Record<string, any>, FieldError>
}
