import { useAuth } from '@components/appProviders/Auth'
import { UserLogin } from '@components/appProviders/Auth/types'
import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { ControlledPasswordInput } from '@components/forms/fields/Password/Controlled'
import { Submit } from '@components/forms/Submit'
import * as React from 'react'
import { useForm } from 'react-hook-form'

const Login: React.FC = () => {
  const { control, handleSubmit } = useForm<UserLogin>()

  const { logIn } = useAuth()
  const handleLogin = React.useCallback((fieldValues: UserLogin) => logIn(fieldValues), [logIn])

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <ControlledEmailInput control={control} required name='email' />
        <ControlledPasswordInput control={control} required name='password' />
        <Submit label='Log In' control={control} />
      </form>
    </div>
  )
}

export default Login
