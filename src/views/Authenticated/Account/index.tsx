import { useAuth } from '@components/appProviders/Auth'
import * as React from 'react'
import { useForm } from 'react-hook-form'

import { Heading, Link, Stack, useToast } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { ControlledPasswordInput } from '@components/forms/fields/Password/Controlled'
import { ControlledRetypeInput } from '@components/forms/fields/Retype/Controlled'
import { Submit } from '@components/forms/Submit'
import { User } from '@elilemons/diva-score-lib'
import { getForgotPasswordTokenQuery } from '@root/queries/user/getForgotPasswordToken'
import { meMutation } from '@root/queries/user/meMutation'
import { userResetPasswordMutation } from '@root/queries/user/userResetPasswordMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { APP_BRAND_BUTTON, APP_INNER_HEADINGS, APP_SPACING } from '@utils/appStyling'
import { toastErrors } from '@utils/toastErrors'
import { useHistory } from 'react-router-dom'

const Account: React.FC = () => {
  const { user, logOut } = useAuth()
  const { control, getValues, handleSubmit } = useForm<Partial<User>>()
  const resetPassword = userResetPasswordMutation()
  const [passwordChanging, setPasswordChanging] = React.useState(false)
  const [resetPasswordToken, setResetPasswordToken] = React.useState<string | undefined>()
  const [newPassword, setNewPassword] = React.useState<string | undefined>()

  const updateMe = meMutation({ mutationKey: 'account-page-update' })

  const history = useHistory()
  const toast = useToast()

  const { data: tokenData } = getForgotPasswordTokenQuery({ run: passwordChanging })

  const onSubmit = React.useCallback(
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
          description: 'There was an error creating your account, please try again.',
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
          description: 'There was an error creating your account, please try again.',
        })
      }
    }
  }, [resetPasswordToken, newPassword])

  return (
    <Layout
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading size={APP_INNER_HEADINGS.size}>Account Page</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={APP_SPACING.spacing}>
              <ControlledEmailInput
                control={control}
                name='email'
                label='Email'
                defaultValue={user?.email}
              />
              <ControlledPasswordInput
                control={control}
                name='password'
                label='New Password'
                required={false}
              />
              <ControlledRetypeInput
                control={control}
                getValues={getValues}
                name='confirmPassword'
                label='Confirm Password'
                placeholder='Confirm Password'
                matchFieldName='password'
                matchFieldType='password'
              />
              <Submit label='Save' control={control} {...APP_BRAND_BUTTON} />

              <Link
                onClick={() => {
                  logOut()
                }}
              >
                Log Out
              </Link>
            </Stack>
          </form>
        </Stack>
      }
    />
  )
}

export default Account
