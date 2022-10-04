export interface MyComponentProps {
  name: string
  slug: string
  content?:{
    slug: string
  }
  params: {
    label?: string
    slot?: string
  }
  override: {
    label?: string
    slot?: string
  }
}
