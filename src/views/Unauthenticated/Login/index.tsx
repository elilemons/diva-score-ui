import { useAuth } from '@components/appProviders/Auth'
import { UserLogin } from '@components/appProviders/Auth/types'
import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { ControlledPasswordInput } from '@components/forms/fields/Password/Controlled'
import { Submit } from '@components/forms/Submit'
import { APP_ROUTES } from '@root/appRoutes'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

const Login: React.FC = () => {
  const { email } = useParams<{ email: string }>()
  const { control, handleSubmit, watch } = useForm<UserLogin>()

  const { logIn } = useAuth()
  const handleLogin = React.useCallback((fieldValues: UserLogin) => logIn(fieldValues), [logIn])

  const emailInput = watch('email')

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <ControlledEmailInput control={control} required name='email' defaultValue={email} />
        <ControlledPasswordInput control={control} required name='password' />
        <Submit label='Log In' control={control} />
        <Link
          to={`${APP_ROUTES.unauthenticated.forgotPassword}${emailInput ? `/${emailInput}` : ''}`}
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  )
}

export default Login
