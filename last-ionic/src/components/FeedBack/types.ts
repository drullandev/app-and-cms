import { Language } from '../../../data/models/Language'
export interface PlaceState {
  name: string,
  images: {
    url: string
  }
  description: {
    description: string
    label: string
    language: Language
  }
  map_marker: {
    name: string
    icon: {
      url: string
    }
  }
}
