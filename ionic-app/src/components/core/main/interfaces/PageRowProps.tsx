import { MenuProps } from './MenuProps'
import { FormProps } from '../../Form/FormProps'
export interface PageRowProps {
  menu?: MenuProps[]
  form?: FormProps[]
  component?: {
    name: string
    slug: string
    params: string
  }
  content?: {
    name: string
    slug: string
  }
  params: string[]
}