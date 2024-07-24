import { RouteComponentProps } from 'react-router'
export interface PageProps extends RouteComponentProps<{
  slug: string,
}> {}