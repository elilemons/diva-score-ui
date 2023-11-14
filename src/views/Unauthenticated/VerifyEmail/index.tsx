import { Button, Stack, useToast } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'
import { verifyUserEmailMutation } from '@root/queries/user/verifyUserEmailMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { APP_BRAND_BUTTON, APP_SPACING } from '@utils/appStyling'
import { toastErrors } from '@utils/toastErrors'
import * as React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string; userId: string }>()
  const verifyEmail = verifyUserEmailMutation({ mutationKey: 'verify-user-email' })
  const history = useHistory()
  const toast = useToast()

  const verify = React.useCallback(async () => {
    if (token) {
      try {
        await verifyEmail.mutateAsync({ token })
        if (!toast.isActive('verify-email-success')) {
          toast({
            title: 'Email Verified',
            description: 'Your email was verified. You may now login.',
            status: 'success',
            id: 'verify-email-success',
          })
          history.push(APP_ROUTES.unauthenticated.login)
        }
      } catch (e) {
        const error = e as GenericStatusErrorType
        toastErrors({ error, id: 'verify-email-false' })
      }
    } else {
      if (!toast.isActive('veirfy-email-invalid-token')) {
        toast({
          title: 'Token Invalid',
          description: `The token is invalid. Have you already been verified? Try logging in.`,
          id: 'verify-email-invalid-token',
          status: 'error',
          isClosable: false,
        })
      }
    }
  }, [])

  React.useEffect(() => {
    verify()
  }, [])

  return (
    <Layout
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Button as={Link} to={APP_ROUTES.unauthenticated.login} {...APP_BRAND_BUTTON}>
            Login
          </Button>
        </Stack>
      }
    />
  )
}

export default VerifyEmail
