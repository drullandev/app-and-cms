export interface StrapiAuthProps {
    user: {
      username?: string
      blocked?: boolean
      confirmed?: boolean
      email?: string
      createdAt?: string
      updatedAt?: string
      provider?: string
      id?: string
    },
    jwt?: string
  }