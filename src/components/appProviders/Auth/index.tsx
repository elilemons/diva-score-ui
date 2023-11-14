import QueryString from 'qs'
import React, { createContext, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { useToast } from '@chakra-ui/react'
import { fetchMeQuery, fetchMeQueryKey } from '@queries/user/fetchMeQuery'
import { useUserLoginMutation } from '@queries/user/userLoginMutation'
import { useUserLogoutMutation } from '@queries/user/userLogoutMutation'
import { userResetPasswordMutation } from '@root/queries/user/userResetPasswordMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { secureStorage } from '@utils/storage'
import { toastErrors } from '@utils/toastErrors'
import { useQueryClient } from 'react-query'
import { Authentication } from './types'

const Context = createContext<Authentication>({
  logIn: () => null,
  logOut: () => null,
  resetPassword: () => null,
  user: undefined,
})
type Props = {
  children: React.ReactNode
}
const AuthProvider: React.FC<Props> = ({ children }) => {
  const { data: user = undefined } = fetchMeQuery({})
  const resetPasswordMutation = userResetPasswordMutation()
  const login = useUserLoginMutation()
  const logoutMutation = useUserLogoutMutation()
  const history = useHistory()
  const queryClient = useQueryClient()
  const toast = useToast()

  const resetPassword = useCallback(
    async (token: string, password: string) => {
      try {
        await resetPasswordMutation.mutateAsync({ token, password })
        const toastId = 'password-reset-success'
        if (!toast.isActive(toastId)) {
          toast({ description: 'Your password has been reset.', status: 'success', id: toastId })
        }
      } catch (e) {
        const error = e as GenericStatusErrorType
        toastErrors({
          error,
          id: 'reset-password-error',
          title: 'Reset Password Error',
        })
      }
    },
    [history, resetPasswordMutation],
  )

  const logIn = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        await login.mutateAsync({ data })

        const toastId = 'login-success'
        if (!toast.isActive(toastId)) {
          toast({
            id: toastId,
            title: 'Login Success',
            description: 'Logged in successfully',
            status: 'success',
            duration: 1500,
          })
        }

        const query = QueryString.parse(window.location.search, { ignoreQueryPrefix: true })
        if (typeof query.redirect === 'string') {
          history.push(query.redirect)
        } else {
          history.push('/dashboard')
        }
      } catch (e) {
        const error = e as GenericStatusErrorType
        toastErrors({
          error,
          id: 'login-failure',
          title: 'Failure to Login',
          description: 'There was an error logging you in. Have you verified your email address?',
        })
        secureStorage.setJWTToken('')
      }
    },
    [history, login],
  )

  const logOut = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync()
      history.push('/login')
    } catch (e) {
      history.push('/login')

      // silently fail
    }
  }, [history, logoutMutation])

  React.useEffect(() => {
    const handleLogOut: () => Promise<void> = async () => {
      if ((await secureStorage.getJWTToken()) === null) {
        queryClient.invalidateQueries([fetchMeQueryKey])
      }
    }
    handleLogOut()
  }, [queryClient])

  return (
    <Context.Provider
      value={{
        user,
        logIn,
        logOut,
        resetPassword,
      }}
    >
      {children}
    </Context.Provider>
  )
}

const useAuth = (): Authentication => useContext(Context)

export { AuthProvider, useAuth }
