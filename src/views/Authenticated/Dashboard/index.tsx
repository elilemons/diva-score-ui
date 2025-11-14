import { Button, Heading, Skeleton, Spinner, Stack, Text, useToast } from '@chakra-ui/react'
import { useAuth } from '@components/appProviders/Auth'
import { Layout } from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'
import { createSurveyMutation } from '@root/queries/survey/createSurveyMutation'
import { getTodaysSurveyIdQuery } from '@root/queries/survey/getTodaysSurveyQueryId'
import { getUsersTotalScoreQuery } from '@root/queries/survey/getUsersTotalScoreQuery'
import { GenericStatusError, GenericStatusErrorType } from '@root/types/errors'
import { toastErrors } from '@root/utils/toastErrors'
import {
  APP_BRAND_BUTTON,
  APP_BRAND_REVERSE_GRADIENT,
  APP_INNER_HEADINGS,
  APP_SPACING,
} from '@utils/appStyling'
import * as React from 'react'
import { useHistory } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const history = useHistory()
  const { data: existingSurvey, isLoading } = getTodaysSurveyIdQuery()
  const createSurvey = createSurveyMutation({ mutationKey: 'user-create-daily-survey' })
  const { data: totalScoreData, isSuccess: totalScoreLoaded } = getUsersTotalScoreQuery()
  const message = history.location.search.split('message=')[1] || ''
  const toast = useToast()

  React.useEffect(() => {
    if (message === 'already-signed-up') {
      if (!toast.isActive('already-signed-up')) {
        toast({
          id: 'already-signed-up',
          title: 'Already Signed Up',
          description: 'You have already signed up for DIVA Score, welcome back!',
          status: 'info',
        })
      }
    }
  }, [message, toast])

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
      showBottomNav
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading data-cy='welcome-message' size={APP_INNER_HEADINGS.size} textAlign='center'>
            Welcome to your Dashboard {user && `${user.firstName}`}!
          </Heading>
          <Text
            data-cy='diva-score'
            size={APP_INNER_HEADINGS.size}
            textAlign='center'
            color='brand.500'
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl', xl: '5xl' }}
            pt={2}
          >
            Your current DIVA score:{' '}
            {totalScoreLoaded ? (
              <Text
                fontWeight='bold'
                bgGradient={APP_BRAND_REVERSE_GRADIENT.bgGradient}
                bgClip='text'
                as='span'
              >
                {totalScoreData?.totalScore || 0}
              </Text>
            ) : (
              <Spinner size='xs' color='brand.300' />
            )}
          </Text>
          <Skeleton isLoaded={!isLoading} width={'100%'} data-cy='skeleton-loading'>
            <Button
              data-cy='beginDailySurvey'
              colorScheme={APP_BRAND_BUTTON.colorScheme}
              bgGradient={APP_BRAND_BUTTON.bgGradient}
              onClick={onBeginClick}
              width={'100%'}
              mt={2}
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
