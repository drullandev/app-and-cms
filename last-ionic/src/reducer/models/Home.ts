export interface Home {
  date: string
  groups: HomeGroup[]
}

export interface HomeGroup {
  time: string
  sessions: Session[]
}

export interface Session {
  id: number
  timeStart: string
  timeEnd: string
  name: string
  location: string
  description: string
  speakerNames: string[]
  tracks: string[]
}
