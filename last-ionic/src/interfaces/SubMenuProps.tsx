export interface SubMenuProps {
  slug: string
  rows: {
    component: any
    field: {
      id: number
      slug: string
    }
    form: any
    id: number
    menu: any
    path: {
      id: number,
      slug: string,
    }
    section: any
    title: string
  }[]
  title: string
  menu: {
    menu: {
      slug: string
      title: string
    }
  }
}