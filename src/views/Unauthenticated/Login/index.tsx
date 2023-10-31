import { useAuth } from '@components/appProviders/Auth'
import { UserLogin } from '@components/appProviders/Auth/types'
import { defaultPasswordValidation, validateEmail } from '@utils/formValidators'
import * as React from 'react'
import { useForm } from 'react-hook-form'

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>()

  const { logIn } = useAuth()
  const handleLogin = React.useCallback((fieldValues: UserLogin) => logIn(fieldValues), [logIn])

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
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
        <input type='submit' />
      </form>
    </div>
  )
}

export default Login
