import { AxiosError, AxiosResponse, Method } from 'axios';
import { ControllerProps, DeepMap, FieldError } from 'react-hook-form';
import { Schema } from 'yup';

export interface GA4Event {
  category: string, // Categoría del evento (puede ser cualquier nombre relevante)
  action: string, // Acción realizada (por ejemplo, 'Clic en botón')
  label?: string, // Etiqueta opcional para detalles adicionales
}

export interface GA4Options {
  load?: GA4Event;
  submit?: FormEventsProps
}

export interface FormEventsProps {
  succcess: GA4Event;
  error: GA4Event;
}

export interface IFormData {
  id: string;
  url: string;
  settings: any;
  fields: IField[];
  buttons?: IField[];
  method?: Method;
  captcha?: false | boolean;
  agreement?: false | boolean;
  privacy?: false | boolean;
  ga4?: GA4Options;
  defaultOutput?: false | boolean;
  onSubmit: (data: any) => ISubmitForm;
  onError?: (err: any) => void;
}

export interface IFormComponent extends IFormData {
  onError?: (errors: DeepMap<Record<string, any>, FieldError>) => void;
}

export interface ISubmitForm {
  data: any;
  onSubmit?: (res: AxiosResponse) => void;
  onError?: (err: AxiosError) => void;
  messages?: ISubmitFormSettings;
}

export interface ISubmitFormSettings {
  onSuccess?: IFormCustomMessage;
  onError?: IFormCustomMessage;
}

export interface IFormCustomMessage {
  header?: string;
  message?: string;
  type?: 'toast' | 'modal';
  show?: boolean;
}

export interface LabelProps {
  name?: string;
  label: string;
  errors?: DeepMap<Record<string, any>, FieldError>;
}

export interface IField {
  id?: string | undefined;
  name: string;
  class?: string;
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
  options?: any[];
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
  animations?: any
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