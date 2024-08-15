import { MenuProps } from './MenuProps'
//import { FormDataProps } from '../../Form/FormDataProps'
export interface PageRowProps {
  menu?: MenuProps[]
  //form?: FormDataProps[]
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