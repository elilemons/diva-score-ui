import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useAuth } from '@components/appProviders/Auth'
import { Layout } from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'
import { APP_PAGE_DESCRIPTIONS, APP_PAGE_HEADINGS, APP_SPACING } from '@utils/appStyling'
import * as React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const { user } = useAuth()
  return (
    <Layout
      topContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading as='h1' size={APP_PAGE_HEADINGS.size}>
            Daily Inspired Vision and Actions
          </Heading>
          <Text fontSize={APP_PAGE_DESCRIPTIONS.fontSize}>
            Elevate the self-care journey for Daily Inspired Vision and Action (Divas) with your own
            DIVA Score. Daily check-ins on body, mind, and spirit activities, each with point
            values, provide a personalized Daily Self-Care Score. Stay accountable to your
            well-being and goals, and cultivate gratitude and connection with this app.
          </Text>
        </Stack>
      }
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          {user ? (
            <>
              <Button colorScheme='brand' size='lg'>
                <Link to={APP_ROUTES.authenticated.dashboard}>Dashboard</Link>
              </Button>
              <Button size='lg'>
                <Link to={APP_ROUTES.authenticated.account}>Manage Account</Link>
              </Button>
            </>
          ) : (
            <>
              <Button colorScheme='brand' size='lg'>
                <Link to={APP_ROUTES.unauthenticated.signup}>Get Started</Link>
              </Button>
              <Button size='lg'>
                <Link to={APP_ROUTES.unauthenticated.login}>Login</Link>
              </Button>
            </>
          )}
        </Stack>
      }
    />
  )
}

export default Home
