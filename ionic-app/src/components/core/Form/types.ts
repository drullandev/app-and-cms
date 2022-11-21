
import { Control, NestDataObject, FieldError, FieldValues, OnSubmit } from 'react-hook-form'

// This is the required form settings interfaces and classes

export interface FormProps {
  id: string
  title:{
    label: string
  }
  rows: RowProps[]
  methods: FormMethods
  validation: Function
  //keyMap: any
}

export interface RowProps {
  cols: FieldProps[]
}

interface FormMethods {
  onSubmit: any
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
  color?: "danger" | "dark" | "light" | "medium" | "primary" | "secondary" | "success" | "tertiary" | "warning" | string & Record<never, never> | undefined
  fill?: 'solid' | 'clear' | 'outline'
  size?: 'small' | 'default' | 'large'
  slot?: 'end' | 'start' | 'icon-only'
  icon?: any,
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
