import { User } from '@elilemons/diva-score-lib'
import { APP_ROUTES } from '@root/appRoutes'
import { createUserMutation } from '@root/queries/user/createUserMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { canLoop } from '@utils/canLoop'
import { defaultPasswordValidation, validateEmail } from '@utils/formValidators'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
type UserSignup = {
  confirmPassword: string
} & User

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Partial<UserSignup>>()

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
        <input
          placeholder='example@email.com'
          {...register('email', {
            required: true,
            validate: {
              validateEmail: v => validateEmail(v),
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type='password'
          {...register('password', {
            required: true,
            validate: {
              defaultPasswordValidation,
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          type='password'
          {...register('confirmPassword', {
            required: true,
            validate: value => {
              const { password } = getValues()
              return password === value || 'Passwords should match!'
            },
          })}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        <input type='submit' />
      </form>
    </div>
  )
}

export default SignUp
