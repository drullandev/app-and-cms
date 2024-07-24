import { CSSProperties } from 'react';
import { ControllerProps, DeepMap, FieldError } from 'react-hook-form';
import { Schema } from 'yup';

export interface FormDataProps {
  id: string;
  fields: FieldProps[];
  captcha?: false | boolean;
  captchaKey?: string;
  buttons: FieldProps[];
  onSuccess:(data: any) => Promise<void>;
  onError: (errors: { [key: string]: any }) => void;
  settings?: any;
}

export interface FormComponentProps extends FormDataProps {
  onError: (errors: DeepMap<Record<string, any>, FieldError>) => void;
}

export interface LabelProps {
  name?: string;
  label: string;
  errors?: DeepMap<Record<string, any>, FieldError>;
}

export interface FieldProps {
  id?: string | undefined;
  name: string;
  label?: any;
  type: string;
  value?: any;
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
  min?: any;
  max?: any;
  color?: string;
  icon?: any;
  href?: string;
  onClick?: Function;
  onChange?: Function;
  secret?: false | boolean;
  loading?: boolean | false;
  siteKey?: string | 'sdfasdfdas';
  csrfToken?: string;
  hidden?: boolean | false;
  captcha?: string;
  captchaKey?: string;
  placeholder?: string | undefined;
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