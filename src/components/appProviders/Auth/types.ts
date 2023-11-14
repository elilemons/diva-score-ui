import type { User } from '@elilemons/diva-score-lib'

export type UserLogin = {
  email: string
  password: string
}

export type Authentication = {
  user:
    | User
    | (User & {
        exp?: number
      })
    | null
    | undefined
  logIn: (data: UserLogin) => void
  logOut: () => void
}
