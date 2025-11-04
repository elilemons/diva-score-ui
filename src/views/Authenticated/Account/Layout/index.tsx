import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Link as ChakraLink, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { APP_ROUTES } from '@root/appRoutes'
import { useAuth } from '@root/components/appProviders/Auth'
import { APP_INNER_HEADINGS, APP_SPACING } from '@root/utils/appStyling'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
  heading: string
  path: '/' | '/edit' | '/reset-password'
}

export const AccountLayout: FC<Props> = ({ children, heading, path }) => {
  const { logOut } = useAuth()

  return (
    <Stack spacing={APP_SPACING.spacing}>
      <Flex align='center' justify='space-between'>
        {path !== '/' && (
          <ChakraLink as={Link} to={APP_ROUTES.authenticated.account}>
            <Button variant='link' leftIcon={<ArrowBackIcon />} color='accent.500'>
              Back to Account Page
            </Button>
          </ChakraLink>
        )}
        <Heading size={APP_INNER_HEADINGS.size}>{heading}</Heading>
      </Flex>
      {children}
      <Stack>
        {path !== '/edit' && (
          <ChakraLink as={Link} to={APP_ROUTES.authenticated.editAccount}>
            <Text as='u' color='accent.500'>
              Edit Account
            </Text>
          </ChakraLink>
        )}
        {path !== '/reset-password' && (
          <ChakraLink as={Link} to={APP_ROUTES.authenticated.resetPassword}>
            <Text as='u' color='accent.500'>
              Reset Password
            </Text>
          </ChakraLink>
        )}
      </Stack>
      <Stack>
        <ChakraLink isExternal to='/terms-of-service' as={Link}>
          <Text as='u' color='accent.500'>
            Terms of Service
          </Text>{' '}
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
  )
}
