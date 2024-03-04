import { Stack, Heading, Text, Box, Spinner } from '@chakra-ui/react'
import { useAuth } from '@root/components/appProviders/Auth'
import { Layout } from '@root/components/elements/Layout'
import { SurveyListing } from '@root/components/elements/SurveyListing'
import { SurveyListingSkeleton } from '@root/components/elements/SurveyListing/loading'
import { getSurveyByIdQuery } from '@root/queries/survey/getSurveyByIdQuery'
import { getTodaysSurveyIdQuery } from '@root/queries/survey/getTodaysSurveyQueryId'
import { getUsersSurveysQuery } from '@root/queries/survey/getUsersSurveysQuery'
import { getUsersTotalScoreQuery } from '@root/queries/survey/getUsersTotalScoreQuery'
import { APP_SPACING, APP_INNER_HEADINGS, APP_PADDING } from '@root/utils/appStyling'
import * as React from 'react'

const Calendar: React.FC = () => {
  const { user } = useAuth()
  const { data: userSurveyData, isSuccess: surveyDataIsLoaded } = getUsersSurveysQuery({})
  const { data: todaysSurveyId } = getTodaysSurveyIdQuery()
  const { data: todaysSurvey, isSuccess: todaysSurveyLoaded } = getSurveyByIdQuery({
    surveyId: todaysSurveyId?.id,
  })
  const { data: totalScoreData, isSuccess: totalScoreLoaded } = getUsersTotalScoreQuery()

  return (
    <Layout
      innerBottomContainerPadding={{ px: '0' }}
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Stack px={APP_PADDING.px}>
            <Heading size={APP_INNER_HEADINGS.size}>{user?.firstName}'s Surveys</Heading>
            <Box>
              <Text as='span' fontWeight={'bold'} data-cy='todays-score-label'>
                {`Today's Score: `}
              </Text>
              {todaysSurveyLoaded ? (
                <Text as='span' data-cy='todays-score-value'>
                  {todaysSurvey?.pointsEarned || 0}
                </Text>
              ) : (
                <Spinner size='xs' color='brand.300' />
              )}
            </Box>

            <Box>
              <Text as='span' fontWeight={'bold'} data-cy='total-score-label'>
                {`Total Score: `}
              </Text>
              {totalScoreLoaded ? (
                <Text as='span' data-cy='total-score-value'>
                  {totalScoreData?.totalScore || 0}
                </Text>
              ) : (
                <Spinner size='xs' color='brand.300' />
              )}
            </Box>
          </Stack>
          {surveyDataIsLoaded ? (
            <Box pt={1}>
              {userSurveyData &&
                userSurveyData.docs.length > 0 &&
                userSurveyData.docs.map((survey, index) => (
                  <SurveyListing
                    backgroundColor={index % 2 === 0 ? 'white' : 'gray.100'}
                    survey={survey}
                    key={survey.id}
                  />
                ))}
            </Box>
          ) : (
            <>
              <SurveyListingSkeleton />
              <SurveyListingSkeleton />
              <SurveyListingSkeleton />
              <SurveyListingSkeleton />
              <SurveyListingSkeleton />
            </>
          )}
        </Stack>
      }
    />
  )
}

export default Calendar
