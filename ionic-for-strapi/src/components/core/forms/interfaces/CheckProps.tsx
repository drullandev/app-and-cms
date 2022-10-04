import { Control, DeepMap, FieldError } from 'react-hook-form'
export interface CheckProps {
  field: {
    label: string,
    name: string,
  }
  onChange: boolean,
  control?: Control,
  errors?: DeepMap<Record<string, any>, FieldError>,
}