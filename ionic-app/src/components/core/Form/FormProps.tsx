
import { Control, NestDataObject, FieldError, FieldValues, OnSubmit } from 'react-hook-form'

// This is the required form settings interfaces and classes

export interface FormProps {
  rows: RowProps[]
  methods: FormMethods
}

export interface RowProps {
  cols: FieldProps[]
}

interface FormMethods {
  onSubmit: OnSubmit<FieldValues>
  onCancel: any 
}

export interface FieldProps {
  name: string
  type: any
  fieldType: any
  label: string
  required?: boolean
  value?: any
  columns?: any[]
  component?: JSX.Element
  control?: Control
  errors?: NestDataObject<Record<string, any>, FieldError>,
  action?: Function
  onChange?: any
  onClick?: any
  onSubmit?: any
  routerLink?: string
  color?: string
}

/////////////////////// mmmm espera!

interface LoginFormProps  {
  input: {
    identifier: string
    password: string
  }
  onSuccess: Function
  onError: Function
}

interface StrapiAuthProps {
  user: {
    id?: string
    username?: string
    email?: string
    blocked?: boolean
    confirmed?: boolean
    createdAt?: string
    updatedAt?: string
    provider?: string
    darkMode?: boolean
  },
  jwt?: string
}
