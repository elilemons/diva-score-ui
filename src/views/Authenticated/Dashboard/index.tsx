import { Heading, Stack } from '@chakra-ui/react'
import { useAuth } from '@components/appProviders/Auth'
import { Layout } from '@components/elements/Layout'
import { APP_INNER_HEADINGS, APP_SPACING } from '@utils/appStyling'
import * as React from 'react'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  return (
    <Layout
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading data-cy='welcome-message' size={APP_INNER_HEADINGS.size} textAlign='center'>
            Welcome to your Dashboard {user && `${user.email}`}!
          </Heading>
        </Stack>
      }
    />
  )
}

export default Dashboard
