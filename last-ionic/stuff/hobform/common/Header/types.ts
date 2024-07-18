export interface HeaderProps {
  header: {
    show_header: false | boolean
    show_back: false | boolean
    name: string
    label: string
    loading: false | boolean
    slug: string
    language: string
    lang: string
    icon: {
      url: string
    },
    show_search?: false | boolean
  }
}