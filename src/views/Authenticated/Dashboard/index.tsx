import { Button, Heading, Stack } from '@chakra-ui/react'
import { useAuth } from '@components/appProviders/Auth'
import { Layout } from '@components/elements/Layout'
import { APP_BRAND_BUTTON, APP_INNER_HEADINGS, APP_SPACING } from '@utils/appStyling'
import * as React from 'react'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  // TODO On begin survey click, we create a survey than navigate to that survey page to edit it

  return (
    <Layout
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading data-cy='welcome-message' size={APP_INNER_HEADINGS.size} textAlign='center'>
            Welcome to your Dashboard {user && `${user.firstName}`}!
          </Heading>
          <Button
            data-cy='beginDailySurvey'
            colorScheme={APP_BRAND_BUTTON.colorScheme}
            bgGradient={APP_BRAND_BUTTON.bgGradient}
          >
            Begin Today's Entry
          </Button>
        </Stack>
      }
    />
  )
}

export default Dashboard
