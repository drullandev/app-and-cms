export interface PathProps {
  slug?: string
  value: string
  component: {
    name?: string
    icon?: string
    iconOut?: string
    exact?: false
    main?: false
    icon_out?: string
    component: {
      name?: string
      slug?: string
      params?: object
    }
  },
  roles: {
    name?: string
    type?: string
  }[]
}