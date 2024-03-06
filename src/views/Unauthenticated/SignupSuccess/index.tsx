import { Button, Stack, Text } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'
import { APP_BRAND_BUTTON, APP_SPACING } from '@utils/appStyling'
import * as React from 'react'
import { Link } from 'react-router-dom'
const SignupSuccess: React.FC = () => {
  return (
    <Layout
      hideBottomNav={true}
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Text>
            You have successfully signed up. Once you confirm your email you will be able to sign
            in.
          </Text>
          <Button
            {...APP_BRAND_BUTTON}
            as={Link}
            to={APP_ROUTES.unauthenticated.login}
            data-cy='backToLogin'
          >
            Back to Login
          </Button>
        </Stack>
      }
    />
  )
}

export default SignupSuccess
