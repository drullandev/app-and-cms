import { MenuProps } from './MenuProps'
import { FormProps } from '../../forms/interfaces/FormProps'
export interface PageRowProps {
  menu?: MenuProps[]
  form?: FormProps[]
  component?: {
    name: string
    slug: string
    params: string
  }
  params: string
}