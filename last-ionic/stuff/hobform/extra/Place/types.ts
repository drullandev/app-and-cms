import { Language } from '../../../data/models/Language'
export interface PlaceState {
  name?: string,
  images?: {
    url: string
  }[]
  optim?: {
    small: any
    big: any
  }[]
  description?: {
    description: string
    label: string
    language: Language
  }
  map_marker?: {
    name: string
    icon: {
      url: string
    }
    translations: {
      id: number
      label: string
      language: Language
    }
  }

}

export interface PlaceProps {
  id: string,
  setPlaceId: Function,
  pageRef: HTMLDivElement
}