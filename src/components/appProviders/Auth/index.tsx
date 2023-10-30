import React, { createContext, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import QueryString from 'qs'

import { GenericStatusErrorType } from '@root/types/errors'
import { secureStorage } from '@utils/storage'
import { Authentication } from './types'
import { fetchMeQuery } from '@queries/user/fetchMeQuery'
import { useUserLoginMutation } from '@queries/user/userLoginMutation'
import { useUserLogoutMutation } from '@queries/user/userLogoutMutation'

const Context = createContext<Authentication>({
  logIn: () => null,
  logOut: () => null,
  user: undefined,
})
type Props = {
  children: React.ReactNode
}
const AuthProvider: React.FC<Props> = ({ children }) => {
  const { data: user = undefined } = fetchMeQuery({})
  const login = useUserLoginMutation()
  const logout = useUserLogoutMutation()
  const navigate = useNavigate()

  const logIn = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        await login.mutateAsync({ data })
        toast.success('Logged in successfully', { autoClose: 1500 })

        const query = QueryString.parse(window.location.search, { ignoreQueryPrefix: true })
        if (typeof query.redirect === 'string') {
          navigate(query.redirect)
        } else {
          navigate('/dashboard')
        }
      } catch (e) {
        const errors = e as GenericStatusErrorType
        secureStorage.setJWTToken('')
        toast.error(errors.message)
      }
    },
    [navigate, login],
  )

  const logOut = useCallback(async () => {
    try {
      await logout.mutateAsync()
      navigate('/login')
    } catch (e) {
      // silently fail
    }
  }, [navigate, logout])

  return (
    <Context.Provider
      value={{
        user,
        logIn,
        logOut,
      }}
    >
      {children}
    </Context.Provider>
  )
}

const useAuth = (): Authentication => useContext(Context)

export { AuthProvider, useAuth }
