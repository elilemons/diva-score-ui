import { Button, Link as ChakraLink, Heading, Stack, Text } from '@chakra-ui/react'
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
        <Stack spacing={APP_SPACING.spacing} align='center'>
          <Heading
            as='h1'
            size={APP_PAGE_HEADINGS.size}
            ml={APP_PAGE_HEADINGS.ml}
            textAlign='center'
          >
            Track your DIVA Score
            <br />
            One Day, One Score at a Time
          </Heading>
          <Text fontSize={APP_PAGE_DESCRIPTIONS.fontSize} pb={APP_PADDING.pb}>
            The DIVA Score app helps Divinely Inspired Vision and Action takers, like you, to
            prioritize what truly matters—tracking progress, cultivating gratitude, and celebrating
            your journey toward balance and growth.
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
          <Stack spacing={APP_SPACING.spacing} align='center'>
            <Text textAlign='center'>
              Stay accountable to your body, mind, spirit, connections, and goals with just 5 daily
              check-ins.
              <br /> Build lasting habits and grow your DIVA Self-Care Score. For more details on
              the DIVA Score App and other projects visit us at:{' '}
              <ChakraLink isExternal href='www.TechDivaSuccess.com/app' color='accent.500'>
                www.TechDivaSuccess.com/app
              </ChakraLink>
            </Text>
          </Stack>
        </Stack>
      }
    />
  )
}

export default Home
