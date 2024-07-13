import { CSSProperties } from 'react';
import { ControllerProps, DeepMap, FieldError } from 'react-hook-form';
import { Schema } from 'yup';

export interface FormProps {
  id: string;
  rows: FieldProps[];
  onSuccess:(data: any) => Promise<void>;
  onError: (errors: { [key: string]: any }) => void;
  settings?: any;
}

export interface FormComponentProps extends FormProps {
  onError: (errors: DeepMap<Record<string, any>, FieldError>) => void;
}

export interface LabelProps {
  name?: string,
  label: string,
  errors?: DeepMap<Record<string, any>, FieldError>
}

export interface FieldProps {
  id?: string | undefined;
  name: string;
  label: any;
  type: string;
  required?: false | boolean | undefined;
  validationSchema?: Schema | undefined;
  className?: string;
  fill?: "default" | "solid" | "clear" | "outline" | undefined;
  size?: "default" | "small" | "large" | undefined;
  fieldType?: "button" | "submit" | "reset" | undefined;
  style?: any | undefined;
  extra?: {
    type?: string;
    label?: string;
  };
  defaultValue?: any;
  options?: { value: string; label: string }[];
  control?: ControllerProps;
  errors?: any;
  min?: any
  max?: any
  color?: string
  icon?: any
  href?: string 
  onClick?: Function;
  secret?: false | boolean;
  loading?: boolean | false;
}

export interface ErrorProps {
  name?: string,
  label?: string,
  errors?: DeepMap<Record<string, any>, FieldError>
}

export interface ModalProps {
  open: boolean
  showButton?:boolean
  model: string
  slug: string
  contentIn?: any
}

export interface SkeletonProps {
  style?: React.CSSProperties;
  lines?: 'none' | 'inset' | 'full';
}

export interface ContentCheckProps {
  label: string
  slug: string
}


/*




// This is the required form settings interfaces and classes
export interface        FormProps {
  fields?: any  
  id: string
  title:{
    label: string
  }
  body: { // Is a grid!!
    rows: RowProps[]
  }
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

export interface OldFieldProps {
  id?: string
  name?: string
  type?: 'input' | 'button' | 'password' | 'text' | 'email'
  fieldType: 'input' | 'check' | 'textarea' | 'button' | 'label' | 'submit' | 'link' | 'password'
  position?: 'floating' | any
  label?: string
  rules?: any
  props?: any
  required?: boolean
  pattern?: any
  minLength?: number
  maxLength?: number
  value?: any 
  columns?: any[]
  fields?: FieldProps[]
  component: ControllerRenderProps
  control?: Control
  errors?: DeepMap<Record<string, any>, FieldError>,
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



export interface FieldPropsNew {
  name: string
  rules?: any
  component: ControllerRenderProps
  defaultValue: null
  label: string
  id?: string
  name?: string
  type?: 'input' | 'button' | 'password' | 'text' | 'email'
  fieldType: 'input' | 'check' | 'textarea' | 'button' | 'label' | 'submit' | 'link' | 'password'
  position?: 'floating' | any
  label?: string
  rules?: any
  props?: any
  required?: boolean
  pattern?: any
  minLength?: number
  maxLength?: number
  value?: any
  columns?: any[]
  fields?: FieldProps[]
  component: ControllerRenderProps
  control?: Control
  errors?: DeepMap<Record<string, any>, FieldError>,
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

export const formAnimation = {
  delay: 1000,
  duration: 1000,    
  iterations: 1,
  fromTo: { property: 'opacity', fromValue: 0, toValue: 1 }
}
*/