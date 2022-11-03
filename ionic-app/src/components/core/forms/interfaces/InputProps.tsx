import { 
  //Path,
   Control, NestDataObject, FieldError, FieldValues, 
   //UseFormRegister, FormValues
  } from "react-hook-form"
export interface InputProps {
  field: {
    fieldType: string,
    type: string,
    slug: string,
    name: string,
    //label: Path<FormValues>
  },
  rules: {
    id: number,
    param: string,
    value: string,
    boolean?: boolean
  }[],
  //register: UseFormRegister<FieldValues>,
  control?: Control,
  errors?: NestDataObject<Record<string, any>, FieldError>,
}