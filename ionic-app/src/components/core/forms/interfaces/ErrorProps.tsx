import { DeepMap, FieldError } from "react-hook-form"
export interface ErrorProps {
  name: string,
  label: string,
  errors?: DeepMap<Record<string, any>, FieldError>
}