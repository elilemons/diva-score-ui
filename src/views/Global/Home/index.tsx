import { Button, ButtonGroup, Heading, Stack, Text } from '@chakra-ui/react'
import { useAuth } from '@components/appProviders/Auth'
import { APP_ROUTES } from '@root/appRoutes'
import * as React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const { user } = useAuth()
  return (
    <Stack spacing={5}>
      <Heading>Daily Inspired Vision and Actions</Heading>
      <Text>
        Elevate the self-care journey for Daily Inspired Vision and Action (Divas) with your own
        DIVA Score. Daily check-ins on body, mind, and spirit activities, each with point values,
        provide a personalized Daily Self-Care Score. Stay accountable to your well-being and goals,
        and cultivate gratitude and connection with this app.
      </Text>

      {user ? (
        <ButtonGroup>
          <Button colorScheme='brand'>
            <Link to={APP_ROUTES.authenticated.dashboard}>Dashboard</Link>
          </Button>
          <Button>
            <Link to={APP_ROUTES.authenticated.account}>Manage Account</Link>
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <Button colorScheme='brand'>
            <Link to={APP_ROUTES.unauthenticated.signup}>Get Started</Link>
          </Button>
          <Button>
            <Link to={APP_ROUTES.unauthenticated.login}>Login</Link>
          </Button>
        </ButtonGroup>
      )}
    </Stack>
  )
}

export default Home
