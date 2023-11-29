import { Heading, Stack } from '@chakra-ui/react'
import { Layout } from '@root/components/elements/Layout'
import { APP_SPACING } from '@root/utils/appStyling'
import * as React from 'react'

const Survey: React.FC = () => {
  return (
    <Layout
      topContent={<Heading data-cy='daily-survey-heading'>Daily Questions</Heading>}
      bottomContent={<Stack spacing={APP_SPACING.spacing}>{/* Form for survey goes here */}</Stack>}
    />
  )
}

export default Survey
