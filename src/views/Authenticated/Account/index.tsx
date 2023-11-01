import { useAuth } from '@components/appProviders/Auth'
import * as React from 'react'
import { useForm } from 'react-hook-form'

import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { ControlledPasswordInput } from '@components/forms/fields/Password/Controlled'
import { ControlledRetypeInput } from '@components/forms/fields/Retype/Controlled'
import { Submit } from '@components/forms/Submit'
import { User } from '@elilemons/diva-score-lib'
import { getForgotPasswordTokenQuery } from '@root/queries/user/getForgotPasswordToken'
import { meMutation } from '@root/queries/user/meMutation'
import { userResetPasswordMutation } from '@root/queries/user/userResetPasswordMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { canLoop } from '@utils/canLoop'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const Account: React.FC = () => {
  const { user, logOut } = useAuth()
  const { control, getValues, handleSubmit } = useForm<Partial<User>>()

  const [passwordChanging, setPasswordChanging] = React.useState(false)
  const [resetPasswordToken, setResetPasswordToken] = React.useState<string | undefined>()
  const [newPassword, setNewPassword] = React.useState<string | undefined>()

  const updateMe = meMutation({ mutationKey: 'account-page-update' })
  const resetPassword = userResetPasswordMutation({ mutationKey: 'account-page-reset-password' })

  const history = useHistory()

  const { data: tokenData } = getForgotPasswordTokenQuery({ run: passwordChanging })

  const onSubmit = React.useCallback(
    async (data: Partial<User>) => {
      try {
        if (user && data.email !== user.email) {
          // Update email
          await updateMe.mutateAsync({
            data,
          })

          toast.success('Your account has been updated.', { toastId: 'account-update-success' })
        }

        if (user && data.password) {
          setPasswordChanging(true)
          setNewPassword(data.password)
        }
      } catch (e) {
        const error = e as GenericStatusErrorType
        if (canLoop(error?.data?.errors)) {
          error.data.errors.forEach(({ message }: { message: string }) =>
            toast.error(message, { autoClose: false, toastId: 'sign-up-errors' }),
          )
        } else {
          toast.error(
            `There was an error creating your account, please try again. Also ${error.message}`,
            { autoClose: false, toastId: 'sign-up-error' },
          )
        }
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
        resetPassword.mutate({
          token: resetPasswordToken,
          password: newPassword,
        })

        toast.success(
          'Your password has been changed! Now please login again with your new password.',
        )
        history.push(`/login`)
        logOut()
      } catch (e) {
        const error = e as GenericStatusErrorType
        if (canLoop(error?.data?.errors)) {
          error.data.errors.forEach(({ message }: { message: string }) =>
            toast.error(message, { autoClose: false, toastId: 'sign-up-errors' }),
          )
        } else {
          toast.error(
            `There was an error creating your account, please try again. Also ${error.message}`,
            { autoClose: false, toastId: 'sign-up-error' },
          )
        }
      }
    }
  }, [resetPasswordToken, newPassword])

  return (
    <div>
      <h1>Welcome to your account page {user?.email}</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledEmailInput control={control} name='email' defaultValue={user?.email} />
          <ControlledPasswordInput control={control} name='password' />
          <ControlledRetypeInput
            control={control}
            getValues={getValues}
            name='confirmPassword'
            label='Confirm Password'
            placeholder='Confirm Password'
            matchFieldName='password'
            matchFieldType='password'
          />
          <Submit label='Save' control={control} />
        </form>
      </div>
      <div>Change Password</div>
    </div>
  )
}

export default Account
