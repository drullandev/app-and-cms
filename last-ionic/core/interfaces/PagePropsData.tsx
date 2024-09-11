import { RouteComponentProps } from 'react-router'
export interface PagePropsData extends RouteComponentProps<{
  slug: string,
}> {}