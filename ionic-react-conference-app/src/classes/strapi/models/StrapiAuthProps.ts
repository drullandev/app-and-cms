export interface StrapiAuthProps {
    user: {
      id?: string
      username?: string
      email?: string
      blocked?: boolean
      confirmed?: boolean
      createdAt?: string
      updatedAt?: string
      provider?: string
      darkMode?: boolean
    },
    jwt?: string
  }