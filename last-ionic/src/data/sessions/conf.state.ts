import { Location } from '../../interfaces/Location'
import { Speaker } from '../../interfaces/Speaker'
import { Schedule, Session } from '../../interfaces/Schedule'
export interface ConfState {
  schedule: Schedule
  sessions: Session[]
  speakers: Speaker[]
  favorites: number[]
  locations: Location[]
  filterDate?: string
  filteredTracks: string[]
  searchString?: string
  searchText?: string
  mapCenterId?: number
  orderField: string
  filter: string
  searchOrder?: string
  loading?: boolean
  allTracks: string[]
  menuEnabled: boolean
}
