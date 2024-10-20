import { ToastOptions } from '@ionic/core/components';
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

export interface IFormAnimations {
  initial: {
    opacity: number;
    y: number;
  };
  animate: {
    opacity: number;
    y: number;
  };
  transition: {
    duration: number;
  };
}

export interface IFormSettings {
  autoSendIfValid?: boolean;  // Indica si el formulario se envía automáticamente si es válido
  animations?: IFormAnimations;  // Define las animaciones del formulario
  afterLoad?: () => void;  // Función que se ejecuta después de que el formulario carga
  style?: React.CSSProperties;  // Propiedades CSS para el estilo del formulario
}

export interface IFormData {
  id: string;
  url: string;
  settings?: IFormSettings;
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
  onSuccess?: (params: any) => void;
  onError?:  (params: any) => void;
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

export const defaultFormSettings = {
  autoSendIfValid: false,
  animations: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  afterLoad: () => {},
  style: { borderRadius: '0%' },
};