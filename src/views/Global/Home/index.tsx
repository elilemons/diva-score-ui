import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useAuth } from '@components/appProviders/Auth'
import { Layout } from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'
import {
  APP_PADDING,
  APP_PAGE_DESCRIPTIONS,
  APP_PAGE_HEADINGS,
  APP_SPACING,
} from '@utils/appStyling'
import * as React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const { user } = useAuth()
  return (
    <Layout
      hideBottomNav={!user}
      topContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading as='h1' size={APP_PAGE_HEADINGS.size} ml={APP_PAGE_HEADINGS.ml}>
            Divinely Inspired Vision and Actions
          </Heading>
          <Text fontSize={APP_PAGE_DESCRIPTIONS.fontSize} pb={APP_PADDING.pb}>
            Elevate the self-care journey for Divinely Inspired Vision and Action with your own DIVA
            Score. Daily check-ins on body, mind, and spirit activities, each with point values,
            provide a personalized Divine Self-Care Score. Stay accountable to your well-being and
            goals, and cultivate gratitude and connection with this app.
          </Text>
        </Stack>
      }
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          {user ? (
            <>
              <Button
                data-cy='dashboard'
                as={Link}
                to={APP_ROUTES.authenticated.dashboard}
                colorScheme='brand'
                size='lg'
                width={'100%'}
              >
                Dashboard
              </Button>
              <Button
                data-cy='account'
                as={Link}
                to={APP_ROUTES.authenticated.account}
                size='lg'
                width={'100%'}
              >
                Manage Account
              </Button>
            </>
          ) : (
            <>
              <Button
                data-cy='signup'
                as={Link}
                to={APP_ROUTES.unauthenticated.signup}
                colorScheme='brand'
                size='lg'
                width={'100%'}
              >
                Get Started
              </Button>
              <Button
                data-cy='login'
                as={Link}
                to={APP_ROUTES.unauthenticated.login}
                size='lg'
                width={'100%'}
              >
                Login
              </Button>
            </>
          )}
        </Stack>
      }
    />
  )
}

export default Home
