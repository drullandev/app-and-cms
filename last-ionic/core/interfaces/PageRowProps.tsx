import { MenuProps } from './MenuProps'
//export interface FormDataProps {
//  slug: string
//}

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