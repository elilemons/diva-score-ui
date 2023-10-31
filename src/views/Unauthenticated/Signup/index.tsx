import { User } from '@elilemons/diva-score-lib'
import { defaultPasswordValidation, validateEmail } from '@utils/formValidators'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type UserSignup = {
  confirmPassword: string
} & User

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Partial<UserSignup>>()

  const onSubmit: SubmitHandler<Partial<UserSignup>> = data => {
    // TODO Remove this test code
    console.log('ELITEST form submission', { data })
    // ^ TODO Remove this test code
  }

  // TODO Remove this test code
  console.log('ELITEST email input', watch('email'))
  console.log('ELITEST password input', watch('password'))
  console.log('ELITEST confirmPassword input', watch('confirmPassword'))
  // ^ TODO Remove this test code

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
          {...register('password', {
            required: true,
            validate: {
              defaultPasswordValidation,
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
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
