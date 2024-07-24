import { ListRowProps } from './ListRowProps'
export interface ListProps {
  rows: ListRowProps[]
  id: number
  title: string
  path?: string
}