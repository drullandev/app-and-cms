export interface UserState {
  userId?: number
  nickname?: string
  useremail?: string
  userJwt?: string
  userDarkMode: boolean
  isLoggedIn: boolean
  hasSeenTutorial?: boolean
  loading?: boolean
}