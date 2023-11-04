import { useAuth } from '@components/appProviders/Auth'
import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { Submit } from '@components/forms/Submit'
import { User } from '@elilemons/diva-score-lib'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const ForgotPassword: React.FC = () => {
  const { email } = useParams<{ email: string }>()
  const { control, handleSubmit } = useForm<Partial<User>>()
  const { forgotPassword } = useAuth()

  const onSubmit = (data: Partial<User>) => {
    if (data && data.email) {
      forgotPassword(data.email)
    }
  }

  return (
    <div>
      <h1>Forgot Password?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledEmailInput control={control} required name='email' defaultValue={email} />
        <Submit control={control} />
      </form>
    </div>
  )
}

export default ForgotPassword
