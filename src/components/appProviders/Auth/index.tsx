import QueryString from 'qs'
import React, { createContext, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { fetchMeQuery, fetchMeQueryKey } from '@queries/user/fetchMeQuery'
import { useUserLoginMutation } from '@queries/user/userLoginMutation'
import { useUserLogoutMutation } from '@queries/user/userLogoutMutation'
import { forgotPasswordMutation } from '@root/queries/user/forgotPasswordMutation'
import { userResetPasswordMutation } from '@root/queries/user/userResetPasswordMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { secureStorage } from '@utils/storage'
import { useQueryClient } from 'react-query'
import { Authentication } from './types'

const Context = createContext<Authentication>({
  logIn: () => null,
  logOut: () => null,
  forgotPassword: () => null,
  resetPassword: () => null,
  user: undefined,
})
type Props = {
  children: React.ReactNode
}
const AuthProvider: React.FC<Props> = ({ children }) => {
  const { data: user = undefined } = fetchMeQuery({})
  const resetPasswordMutation = userResetPasswordMutation()
  const forgotpassword = forgotPasswordMutation()
  const login = useUserLoginMutation()
  const logoutMutation = useUserLogoutMutation()
  const history = useHistory()
  const queryClient = useQueryClient()

  const resetPassword = useCallback(
    async (token: string, password: string) => {
      try {
        await resetPasswordMutation.mutateAsync({ token, password })
        toast.success('Your password has been reset.')
      } catch (e) {
        const errors = e as GenericStatusErrorType
        toast.error(`${errors.message}`, { toastId: 'reset-password-error' })
      }
    },
    [history, forgotpassword],
  )

  const forgotPassword = useCallback(
    async (email: string) => {
      try {
        await forgotpassword.mutateAsync({ email })
        toast.success(
          'If your email matches an account we have, an email to reset your password has been sent to it.',
        )
      } catch (e) {
        const errors = e as GenericStatusErrorType
        toast.error(`${errors.message}`, { toastId: 'forgot-password-error' })
      }
    },
    [history, forgotpassword],
  )

  const logIn = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        await login.mutateAsync({ data })
        toast.success('Logged in successfully', { autoClose: 1500, toastId: 'login-success' })

        const query = QueryString.parse(window.location.search, { ignoreQueryPrefix: true })
        if (typeof query.redirect === 'string') {
          history.push(query.redirect)
        } else {
          history.push('/dashboard')
        }
      } catch (e) {
        const errors = e as GenericStatusErrorType
        secureStorage.setJWTToken('')
        toast.error(`${errors.message} Have you verified your email?`, {
          autoClose: false,
          toastId: 'login-failure',
        })
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
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </Context.Provider>
  )
}

const useAuth = (): Authentication => useContext(Context)

export { AuthProvider, useAuth }
