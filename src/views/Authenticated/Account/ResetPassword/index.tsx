import { useAuth } from '@components/appProviders/Auth'
import * as React from 'react'
import { useForm } from 'react-hook-form'

import { Stack, useToast } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { ControlledPasswordInput } from '@components/forms/fields/Password/Controlled'
import { ControlledRetypeInput } from '@components/forms/fields/Retype/Controlled'
import { User } from '@elilemons/diva-score-lib'
import { Submit } from '@root/components/forms/Submit'
import { getForgotPasswordTokenQuery } from '@root/queries/user/getForgotPasswordToken'
import { userResetPasswordMutation } from '@root/queries/user/userResetPasswordMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { APP_BRAND_BUTTON, APP_SPACING } from '@utils/appStyling'
import { toastErrors } from '@utils/toastErrors'
import { useHistory } from 'react-router-dom'
import { AccountLayout } from '../Layout'

const ResetPassword: React.FC = () => {
  const { user, logOut } = useAuth()
  const { control, getValues, handleSubmit } = useForm<Partial<User>>()
  const resetPassword = userResetPasswordMutation()
  const [passwordChanging, setPasswordChanging] = React.useState(false)
  const [resetPasswordToken, setResetPasswordToken] = React.useState<string | undefined>()
  const [newPassword, setNewPassword] = React.useState<string | undefined>()

  const history = useHistory()
  const toast = useToast()

  const { data: tokenData } = getForgotPasswordTokenQuery({ run: passwordChanging })

  const onSubmit = React.useCallback(
    async (data: Partial<User>) => {
      try {
        if (user && data.password) {
          setPasswordChanging(true)
          setNewPassword(data.password)
        }
      } catch (e) {
        const error = e as GenericStatusErrorType
        toastErrors({
          id: 'account-update-error',
          error,
          title: 'Account Update Error',
          description: 'There was an error updating your account, please try again.',
        })
      }
    },
    [user],
  )

  React.useEffect(() => {
    if (tokenData && passwordChanging) {
      setResetPasswordToken(tokenData.token)
    }
  }, [tokenData, passwordChanging])

  React.useEffect(() => {
    if (resetPasswordToken && newPassword) {
      try {
        resetPassword.mutateAsync({ token: resetPasswordToken, password: newPassword }).then(() => {
          const toastId = 'reset-password-success'
          if (!toast.isActive(toastId)) {
            toast({
              id: toastId,
              title: 'Reset Password Success',
              description:
                'Your password has been changed! Now please login again with your new password.',
              status: 'success',
            })
          }

          history.push(`/login`)
          logOut()
        })
      } catch (e) {
        const error = e as GenericStatusErrorType
        toastErrors({
          error,
          id: 'reset-password-errors',
          title: 'Reset Password Failure',
          description: 'There was an error resetting your password, please try again.',
        })
      }
    }
  }, [resetPasswordToken, newPassword])

  return (
    <Layout
      showBottomNav
      bottomContent={
        <AccountLayout heading='Reset Password' path='/reset-password'>
          <form onSubmit={handleSubmit(onSubmit)} data-cy='reset-password-form'>
            <Stack spacing={APP_SPACING.spacing}>
              <ControlledPasswordInput
                control={control}
                name='password'
                label='New Password'
                required
              />
              <ControlledRetypeInput
                control={control}
                getValues={getValues}
                name='confirmPassword'
                label='Confirm Password'
                placeholder='Confirm Password'
                matchFieldName='password'
                matchFieldType='password'
                required
              />

              <Submit label='Save' control={control} {...APP_BRAND_BUTTON} />
            </Stack>
          </form>
        </AccountLayout>
      }
    />
  )
}

export default ResetPassword
