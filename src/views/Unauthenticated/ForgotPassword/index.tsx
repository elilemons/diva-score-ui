import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useAuth } from '@components/appProviders/Auth'
import { Layout } from '@components/elements/Layout'
import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { Submit } from '@components/forms/Submit'
import { User } from '@elilemons/diva-score-lib'
import { APP_ROUTES } from '@root/appRoutes'
import { APP_BRAND_BUTTON, APP_FORM_HEADINGS, APP_SPACING } from '@utils/appStyling'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

const ForgotPassword: React.FC = () => {
  const { email } = useParams<{ email: string }>()
  const { control, handleSubmit } = useForm<Partial<User>>()
  const { forgotPassword } = useAuth()

  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false)

  const onSubmit = (data: Partial<User>) => {
    if (data && data.email) {
      forgotPassword(data.email)
      setIsSubmitted(true)
    }
  }

  return (
    <Layout
      bottomContent={
        isSubmitted ? (
          <Stack spacing={APP_SPACING.spacing}>
            <Heading size={APP_FORM_HEADINGS.size}>Submitted</Heading>
            <Text>
              Your forgot password request has been submitted. If your email is in our system, you
              should receive instructions to reset your password shortly.
            </Text>
            <Button as={Link} {...APP_BRAND_BUTTON} to={APP_ROUTES.unauthenticated.login}>
              Back to Login
            </Button>
          </Stack>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={APP_SPACING.spacing}>
              <Heading size={APP_FORM_HEADINGS.size}>Forgot Password?</Heading>
              <ControlledEmailInput
                control={control}
                required
                name='email'
                label='Email'
                defaultValue={email}
              />
              <Submit control={control} {...APP_BRAND_BUTTON} />
            </Stack>
          </form>
        )
      }
    />
  )
}

export default ForgotPassword
