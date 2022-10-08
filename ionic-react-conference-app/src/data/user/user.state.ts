export interface UserState {
  isLoggedin: boolean
  username?: string
  darkMode: boolean
  hasSeenTutorial: boolean
  loading: boolean
  jwt?: string
  blocked?: boolean
  confirmed?: boolean
  createdAt?: string // Convert the correct type of data required here
  updatedAt?: string // Convert the correct type of data required here
  email?: string
  provider?: string
  id?: string
}
