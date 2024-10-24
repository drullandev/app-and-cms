import { PathProps } from './PathProps'
export interface MenuRowProps {
  row: {
    title: string
    component: {
      component: {
        id: number
      }
      icon: string
    }
    slug: string
    path: PathProps
  }
}