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
  darkMode?: boolean
  caret: any
  // Extra
  isLoggedIn: boolean
  hasSeenTutorial: boolean
  loading: boolean
}
