import { useAuth } from '@components/appProviders/Auth'

import { Link as ChakraLink, Heading, Stack, Text } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'
import { APP_INNER_HEADINGS, APP_SPACING } from '@utils/appStyling'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const Account: FC = () => {
  const { user, logOut } = useAuth()

  return (
    <Layout
      showBottomNav
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading size={APP_INNER_HEADINGS.size}>Account Page</Heading>
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
            <Stack>
              <ChakraLink isExternal to='/terms-of-service' as={Link}>
                <Text as='u' color='accent.500'>
                  Terms of Service
                </Text>
              </ChakraLink>
              <ChakraLink isExternal to='/privacy-policy' as={Link}>
                <Text as='u' color='accent.500'>
                  Privacy Policy
                </Text>
              </ChakraLink>
              <ChakraLink
                onClick={() => {
                  logOut()
                }}
              >
                <Text as='u' color='brand.500'>
                  Log Out
                </Text>
              </ChakraLink>
            </Stack>
          </Stack>
        </Stack>
      }
    />
  )
}

export default Account
