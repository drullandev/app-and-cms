export interface UserState {
  // From Strapi
  id?: string
  jwt?: string
  username?: string
  email?: string
  blocked?: boolean
  confirmed?: boolean
  createdAt?: string // Convert the correct type of data required here
  updatedAt?: string // Convert the correct type of data required here
  provider?: string
  // Extra
  isLoggedin: boolean
  darkMode: boolean
  hasSeenTutorial: boolean
  loading: boolean
}
