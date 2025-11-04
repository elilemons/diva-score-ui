import { useAuth } from '@components/appProviders/Auth'

import { Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'
import { APP_SPACING } from '@utils/appStyling'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { AccountLayout } from './Layout'

const Account: FC = () => {
  const { user } = useAuth()

  return (
    <Layout
      showBottomNav
      bottomContent={
        <AccountLayout heading='Account Page' isAccountHome>
          <Stack spacing={APP_SPACING.spacing}>
            <Stack>
              <Text fontWeight={600}>First Name</Text>
              <Text as='p'>{user?.firstName}</Text>
            </Stack>
            <Stack>
              <Text fontWeight={600}>Last Name</Text>
              <Text as='p'>{user?.lastName}</Text>
            </Stack>
            <Stack>
              <Text fontWeight={600}>Email</Text>
              <Text as='p'>{user?.email}</Text>
            </Stack>
            <ChakraLink as={Link} to={APP_ROUTES.authenticated.editAccount}>
              <Text as='u' color='accent.500'>
                Edit Account Info
              </Text>
            </ChakraLink>
            <ChakraLink as={Link} to={APP_ROUTES.authenticated.resetPassword}>
              <Text as='u' color='accent.500'>
                Reset Password
              </Text>
            </ChakraLink>
          </Stack>
        </AccountLayout>
      }
    />
  )
}

export default Account
