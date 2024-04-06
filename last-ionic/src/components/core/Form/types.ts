
import { Control, FieldError, FieldValues } from 'react-hook-form'

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
  type?: 'input' | 'button' | 'password' | 'text' | 'email'
  fieldType?: 'input' | 'check' | 'textarea' | 'button' | 'label'
  position?: 'floating' | any
  label?: string
  required?: boolean
  pattern?: any
  minLength?: number
  maxLength?: number
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
  color?: 'danger' | 'dark' | 'light' | 'medium' | 'primary' | 'secondary' | 'success' | 'tertiary' | 'warning'
  fill?: 'solid' | 'clear' | 'outline'
  size?: 'small' | 'default' | 'large'
  slot?: 'end' | 'start' | 'icon-only'
  icon?: any,
}

// Define los tipos para los componentes y los props asociados
export interface ComponentProps {
  [key: string]: {
    component: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    props: any;
  }
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

export interface TabMenuButtonProps {
  tab:{
    path: {
      slug: string
      value: string
    }
    icon: string
    label: string
  }
}