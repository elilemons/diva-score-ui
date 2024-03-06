import { Button, Heading, Stack, Text, useToast } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { Submit } from '@components/forms/Submit'
import { User } from '@elilemons/diva-score-lib'
import { APP_ROUTES } from '@root/appRoutes'
import { forgotPasswordMutation } from '@root/queries/user/forgotPasswordMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { APP_BRAND_BUTTON, APP_INNER_HEADINGS, APP_SPACING } from '@utils/appStyling'
import { toastErrors } from '@utils/toastErrors'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

const ForgotPassword: React.FC = () => {
  const { email } = useParams<{ email: string }>()
  const { control, handleSubmit } = useForm<Partial<User>>()
  const forgotPassword = forgotPasswordMutation()
  const toast = useToast()

  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false)

  const onSubmit = async (data: Partial<User>) => {
    if (data && data.email) {
      try {
        await forgotPassword.mutateAsync({ email: data.email }).then(() => {
          const toastId = 'forgot-password-success'
          if (!toast.isActive(toastId)) {
            toast({
              id: toastId,
              title: 'Forgot Password Submitted',
              status: 'success',
            })
          }
          setIsSubmitted(true)
        })
      } catch (e) {
        const error = e as GenericStatusErrorType
        toastErrors({
          error,
          id: 'forgot-password-error',
          title: 'Forgot Password Error',
        })
      }
    }
  }

  return (
    <Layout
      hideBottomNav={true}
      bottomContent={
        isSubmitted ? (
          <Stack spacing={APP_SPACING.spacing}>
            <Heading size={APP_INNER_HEADINGS.size}>Submitted</Heading>
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
              <Heading size={APP_INNER_HEADINGS.size}>Forgot Password?</Heading>
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
