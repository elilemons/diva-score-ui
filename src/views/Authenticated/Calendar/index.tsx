import { Stack, Heading, Text, Box, Spinner } from '@chakra-ui/react'
import { useAuth } from '@root/components/appProviders/Auth'
import { Layout } from '@root/components/elements/Layout'
import { SurveyListing } from '@root/components/elements/SurveyListing'
import { SurveyListingSkeleton } from '@root/components/elements/SurveyListing/loading'
import { getSurveyByIdQuery } from '@root/queries/survey/getSurveyByIdQuery'
import { getTodaysSurveyIdQuery } from '@root/queries/survey/getTodaysSurveyQueryId'
import { getUsersSurveysQuery } from '@root/queries/survey/getUsersSurveysQuery'
import { getUsersTotalScoreQuery } from '@root/queries/survey/getUsersTotalScoreQuery'
import { APP_BRAND_REVERSE_GRADIENT, APP_INNER_HEADINGS, APP_PADDING } from '@root/utils/appStyling'
import * as React from 'react'

const Calendar: React.FC = () => {
  const { user } = useAuth()
  const { data: userSurveyData, isSuccess: surveyDataIsLoaded } = getUsersSurveysQuery({})
  const { data: todaysSurveyId, isSuccess: todaysSurveyIdIsLoaded } = getTodaysSurveyIdQuery()
  const { data: todaysSurvey, isSuccess: todaysSurveyLoaded } = getSurveyByIdQuery({
    surveyId: todaysSurveyId?.id,
  })
  const { data: totalScoreData, isSuccess: totalScoreLoaded } = getUsersTotalScoreQuery()

  const [todaysScore, setTodaysScore] = React.useState<number>(0)

  React.useEffect(() => {
    if (todaysSurveyIdIsLoaded && todaysSurveyLoaded && todaysSurvey) {
      setTodaysScore(todaysSurvey.pointsEarned || 0)
    }
  }, [todaysSurveyId, todaysSurveyIdIsLoaded, todaysSurveyLoaded, todaysSurvey])

  return (
    <Layout
      showBottomNav
      innerBottomContainerPadding={{ px: '0' }}
      bottomContent={
        <Box>
          <Stack pb={APP_PADDING.pb} px={APP_PADDING.px}>
            <Heading size={APP_INNER_HEADINGS.size}>{user?.firstName}'s Daily History</Heading>
            <Box fontSize='xl'>
              <Text as='span' fontWeight={'bold'} data-cy='total-score-label'>
                {`Your Total DIVA Score: `}
              </Text>
              {totalScoreLoaded ? (
                <Text
                  as='span'
                  data-cy='total-score-value'
                  bgGradient={APP_BRAND_REVERSE_GRADIENT.bgGradient}
                  bgClip='text'
                >
                  {totalScoreData?.totalScore || 0}
                </Text>
              ) : (
                <Spinner size='xs' color='brand.300' />
              )}
            </Box>
            <Box fontSize='xl'>
              <Text as='span' fontWeight={'bold'} data-cy='todays-score-label'>
                {`Today's Score: `}
              </Text>
              {todaysSurveyIdIsLoaded ? (
                <Text as='span' data-cy='todays-score-value'>
                  {todaysScore}
                </Text>
              ) : (
                <Spinner size='xs' color='brand.300' data-cy='todays-score-value-loading' />
              )}
            </Box>

            <Text>
              Modify your daily score until the clock strikes midnight. Once the day is complete,
              your daily history becomes a locked treasure, capturing your unique journey.
            </Text>
          </Stack>
          {surveyDataIsLoaded ? (
            userSurveyData &&
            userSurveyData.docs &&
            userSurveyData.docs.length > 0 &&
            userSurveyData.docs.map((survey, index) => (
              <React.Fragment key={survey.id}>
                <SurveyListing
                  backgroundColor={index % 2 === 0 ? 'white' : 'gray.100'}
                  survey={survey}
                />
              </React.Fragment>
            ))
          ) : (
            <>
              <SurveyListingSkeleton />
              <SurveyListingSkeleton backgroundColor='gray.100' />
              <SurveyListingSkeleton />
              <SurveyListingSkeleton backgroundColor='gray.100' />
              <SurveyListingSkeleton />
              <SurveyListingSkeleton backgroundColor='gray.100' />
            </>
          )}
        </Box>
      }
    />
  )
}

export default Calendar
