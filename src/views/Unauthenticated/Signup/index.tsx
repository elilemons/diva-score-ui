import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { ControlledPasswordInput } from '@components/forms/fields/Password/Controlled'
import { ControlledRetypeInput } from '@components/forms/fields/Retype/Controlled'
import { Submit } from '@components/forms/Submit'
import { User } from '@elilemons/diva-score-lib'
import { APP_ROUTES } from '@root/appRoutes'
import { createUserMutation } from '@root/queries/user/createUserMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { canLoop } from '@utils/canLoop'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
type UserSignup = {
  confirmPassword: string
} & User

const SignUp: React.FC = () => {
  const { control, getValues, handleSubmit } = useForm<Partial<UserSignup>>()

  const createUser = createUserMutation({ mutationKey: 'sign-up-form' })

  const onSubmit: SubmitHandler<Partial<UserSignup>> = async data => {
    try {
      await createUser
        .mutateAsync({
          data,
        })
        .then(() => {
          window.location.assign(`${APP_ROUTES.unauthenticated.signupSuccess}`)
        })
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

  return (
    <div>
      <h1>Sign Up for DIVA Score</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledEmailInput control={control} required name='email' />
        <ControlledPasswordInput control={control} required name='password' />
        <ControlledRetypeInput
          control={control}
          getValues={getValues}
          required
          name='confirmPassword'
          label='Confirm Password'
          placeholder='Confirm Password'
          matchFieldName='password'
          matchFieldType='password'
        />

        <Submit label='Sign up' control={control} />
      </form>
    </div>
  )
}

export default SignUp
