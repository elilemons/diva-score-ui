import { useAuth } from '@components/appProviders/Auth'
import { FC, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Stack, useToast } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { Submit } from '@components/forms/Submit'
import { User } from '@elilemons/diva-score-lib'
import { ControlledTextInput } from '@root/components/forms/fields/Text/Controlled'
import { getForgotPasswordTokenQuery } from '@root/queries/user/getForgotPasswordToken'
import { meMutation } from '@root/queries/user/meMutation'
import { userResetPasswordMutation } from '@root/queries/user/userResetPasswordMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { APP_BRAND_BUTTON, APP_SPACING } from '@utils/appStyling'
import { toastErrors } from '@utils/toastErrors'
import { useHistory } from 'react-router-dom'
import { AccountLayout } from '../Layout'

const AccountEdit: FC = () => {
  const { user, logOut } = useAuth()
  const { control, handleSubmit } = useForm<Partial<User>>()
  const resetPassword = userResetPasswordMutation()
  const [passwordChanging, setPasswordChanging] = useState(false)
  const [resetPasswordToken, setResetPasswordToken] = useState<string | undefined>()
  const [newPassword, setNewPassword] = useState<string | undefined>()

  const updateMe = meMutation({ mutationKey: 'account-page-update' })

  const history = useHistory()
  const toast = useToast()

  const { data: tokenData } = getForgotPasswordTokenQuery({ run: passwordChanging })

  const onSubmit = useCallback(
    async (data: Partial<User>) => {
      try {
        if (user && data.email !== user.email) {
          // Update email
          await updateMe.mutateAsync({
            data,
          })

          const toastId = 'account-update-success'
          if (!toast.isActive(toastId)) {
            toast({
              id: toastId,
              description: 'Your account has been updated.',
              status: 'success',
            })
          }
        }

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

  useEffect(() => {
    if (tokenData && passwordChanging) {
      setResetPasswordToken(tokenData.token)
    }
  }, [tokenData, passwordChanging])

  useEffect(() => {
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
          description: 'There was an error creating your account, please try again.',
        })
      }
    }
  }, [resetPasswordToken, newPassword])

  return (
    <Layout
      showBottomNav
      bottomContent={
        <AccountLayout heading='Edit Account Page' path='/edit'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={APP_SPACING.spacing}>
              <ControlledTextInput
                control={control}
                name='firstName'
                label='First Name'
                defaultValue={user?.firstName ?? ''}
              />
              <ControlledTextInput
                control={control}
                name='lastName'
                label='Last Name'
                defaultValue={user?.lastName ?? ''}
              />
              <ControlledEmailInput
                control={control}
                name='email'
                label='Email'
                defaultValue={user?.email}
              />
              <Submit label='Save' control={control} {...APP_BRAND_BUTTON} />
            </Stack>
          </form>
        </AccountLayout>
      }
    />
  )
}

export default AccountEdit
