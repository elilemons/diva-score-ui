import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react'
import { useAuth } from '@components/appProviders/Auth'
import { APP_ROUTES } from '@root/appRoutes'
import * as React from 'react'
import { Link } from 'react-router-dom'

const TopNav: React.FC = () => {
  const { user, logOut } = useAuth()

  return (
    <Flex
      alignItems='center'
      gap={2}
      p={4}
      mb={14}
      borderBottom='1px'
      borderBottomColor='gray.200'
      boxShadow='sm'
    >
      <Box>
        <Heading size='md'>
          <Link to={APP_ROUTES.authenticated.dashboard}>DIVA Score</Link>
        </Heading>
      </Box>
      <Spacer />

      <ButtonGroup gap={2}>
        {user ? (
          <>
            <Button variant='ghost' colorScheme='brand'>
              <Link to={APP_ROUTES.authenticated.dashboard}>Dashboard</Link>
            </Button>

            <Button variant='ghost' colorScheme='brand'>
              <Link to={APP_ROUTES.authenticated.dashboard}>Calendar</Link>
            </Button>

            <Button variant='ghost' colorScheme='brand'>
              <Link to={APP_ROUTES.authenticated.account}>Account</Link>
            </Button>

            <Button onClick={logOut}>Logout</Button>
          </>
        ) : (
          <>
            <Button variant='ghost' colorScheme='brand'>
              <Link to={APP_ROUTES.global.home}>Home</Link>
            </Button>

            <Button variant='ghost' colorScheme='brand'>
              <Link to={APP_ROUTES.unauthenticated.login}>Login</Link>
            </Button>
            <Button variant='ghost' colorScheme='brand'>
              <Link to={APP_ROUTES.unauthenticated.signup}>Get Started</Link>
            </Button>
          </>
        )}
      </ButtonGroup>
    </Flex>
  )
}

export default TopNav
