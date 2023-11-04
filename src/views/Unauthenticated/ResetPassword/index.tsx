import { useAuth } from '@components/appProviders/Auth'
import { ControlledPasswordInput } from '@components/forms/fields/Password/Controlled'
import { ControlledRetypeInput } from '@components/forms/fields/Retype/Controlled'
import { Submit } from '@components/forms/Submit'
import { User } from '@elilemons/diva-score-lib'
import { APP_ROUTES } from '@root/appRoutes'
import { GenericStatusErrorType } from '@root/types/errors'
import { canLoop } from '@utils/canLoop'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPassword: React.FC = () => {
  const { resetPassword } = useAuth()
  const { control, getValues, handleSubmit } = useForm()
  const { token, email } = useParams<{ token: string; email: string }>()

  const history = useHistory()

  const onSubmit = (data: Partial<User>) => {
    if (data && data.password) {
      try {
        resetPassword(token, data.password)
        toast.success('Your password was reset successfully! You can now login.')
        history.push(`${APP_ROUTES.unauthenticated.login}/${email}`)
      } catch (e) {
        const error = e as GenericStatusErrorType
        if (canLoop(error?.data?.errors)) {
          error.data.errors.forEach(({ message }: { message: string }) =>
            toast.error(message, { autoClose: false, toastId: 'reset-password-errors' }),
          )
        } else {
          toast.error(
            `There was an error resetting your password, please try again. Also ${error.message}`,
            { autoClose: false, toastId: 'reset-password-error' },
          )
        }
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
  )
}

export default ResetPassword
