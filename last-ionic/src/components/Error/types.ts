import { NestDataObject, FieldError } from "react-hook-form"
export interface ErrorProps {
  name: string,
  label: string,
  errors?: NestDataObject<Record<string, any>, FieldError>
}