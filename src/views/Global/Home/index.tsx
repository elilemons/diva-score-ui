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
      showBottomNav={!!user}
      topContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading as='h1' size={APP_PAGE_HEADINGS.size} ml={APP_PAGE_HEADINGS.ml}>
            Track Your Daily DIVA Score — Reflect and Elevate Your Self-Care Journey
          </Heading>
          <Text fontSize={APP_PAGE_DESCRIPTIONS.fontSize} pb={APP_PADDING.pb}>
            5 simple daily check-ins on Body, Mind, Spirit, Connection, and Goals. Get your
            personalized DIVA Self-Care Score and stay accountable to what really matters.
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
