import { useAuth } from '@components/appProviders/Auth'

import { Stack, Text } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { APP_SPACING } from '@utils/appStyling'
import { FC } from 'react'
import { AccountLayout } from './Layout'

const Account: FC = () => {
  const { user } = useAuth()

  return (
    <Layout
      showBottomNav
      bottomContent={
        <AccountLayout heading='Account Page' path='/'>
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
          </Stack>
        </AccountLayout>
      }
    />
  )
}

export default Account
