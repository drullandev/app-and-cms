import { Path, Control, DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form"
export interface InputProps {
  field: {
    fieldType: string,
    type: string,
    slug: string,
    name: string,
    label: Path<FormValues>
  },
  rules: {
    id: number,
    param: string,
    value: string,
    boolean?: boolean
  }[],
  register: UseFormRegister<FieldValues>,
  control?: Control,
  errors?: DeepMap<Record<string, any>, FieldError>,
}