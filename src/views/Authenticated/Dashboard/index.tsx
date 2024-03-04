import { Button, Heading, Skeleton, Stack } from '@chakra-ui/react'
import { useAuth } from '@components/appProviders/Auth'
import { Layout } from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'
import { createSurveyMutation } from '@root/queries/survey/createSurveyMutation'
import { getTodaysSurveyIdQuery } from '@root/queries/survey/getTodaysSurveyQueryId'
import { GenericStatusError, GenericStatusErrorType } from '@root/types/errors'
import { toastErrors } from '@root/utils/toastErrors'
import { APP_BRAND_BUTTON, APP_INNER_HEADINGS, APP_SPACING } from '@utils/appStyling'
import * as React from 'react'
import { useHistory } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const history = useHistory()
  const { data: existingSurvey, isLoading } = getTodaysSurveyIdQuery()
  const createSurvey = createSurveyMutation({ mutationKey: 'user-create-daily-survey' })

  const onBeginClick = async () => {
    if (existingSurvey && existingSurvey.id) {
      history.push(`${APP_ROUTES.authenticated.survey}/${existingSurvey.id}`)
    } else {
      try {
        if (user) {
          await createSurvey
            .mutateAsync({
              title: 'Daily Check-in',
              surveyUser: user?.id,
              surveyDate: new Date(),
            })
            .then(res => {
              if (res.doc) {
                history.push(`${APP_ROUTES.authenticated.survey}/${res.doc.id}`)
              } else {
                throw GenericStatusError({
                  status: 501,
                  message: 'An unknown error occured while creating the survey.',
                })
              }
            })
            .catch(error => {
              throw error
            })
        }
      } catch (e) {
        const error = e as GenericStatusErrorType
        toastErrors({
          error,
          id: 'create-survey-error',
          title: 'Survey Creation Error',
          description: 'There was an error creating the survey, please try again.',
        })
      }
    }
  }

  return (
    <Layout
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading data-cy='welcome-message' size={APP_INNER_HEADINGS.size} textAlign='center'>
            Welcome to your Dashboard {user && `${user.firstName}`}!
          </Heading>
          <Skeleton isLoaded={!isLoading} width={'100%'} data-cy='skeleton-loading'>
            <Button
              data-cy='beginDailySurvey'
              colorScheme={APP_BRAND_BUTTON.colorScheme}
              bgGradient={APP_BRAND_BUTTON.bgGradient}
              onClick={onBeginClick}
              width={'100%'}
            >
              {existingSurvey && existingSurvey.id ? 'Continue' : 'Begin'} Today's Entry
            </Button>
          </Skeleton>
        </Stack>
      }
    />
  )
}

export default Dashboard
