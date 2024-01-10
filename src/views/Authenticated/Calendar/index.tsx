import { Stack, Heading, Text, Box } from '@chakra-ui/react'
import { Layout } from '@root/components/elements/Layout'
import { getSurveyByIdQuery } from '@root/queries/survey/getSurveyByIdQuery'
import { getTodaysSurveyQuery } from '@root/queries/survey/getTodaysSurveyQuery'
import { getUsersSurveysQuery } from '@root/queries/survey/getUsersSurveysQuery'
import { APP_SPACING, APP_INNER_HEADINGS } from '@root/utils/appStyling'
import * as React from 'react'

const Calendar: React.FC = () => {
  const { data: surveyData } = getUsersSurveysQuery({ limit: 10 })
  // const { data: totalScore } = getUsersTotalScore()
  const { data: todaysSurveyId } = getTodaysSurveyQuery()
  const { data: todaysSurvey } = getSurveyByIdQuery({ surveyId: todaysSurveyId?.id })
  // TODO Remove this test code
  console.log('ELITEST Calendar', { surveyData })
  // ^ TODO Remove this test code

  return (
    <Layout
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading size={APP_INNER_HEADINGS.size}>Calendar Page</Heading>
          <Box>
            <Text as='span' fontWeight={'bold'} data-cy='todays-score-label'>
              {`Todays Score: `}
            </Text>
            <Text as='span' data-cy='todays-score-value'>
              {todaysSurvey?.pointsEarned || 0}
            </Text>
          </Box>

          <Box>
            <Text as='span' fontWeight={'bold'} data-cy='total-score-label'>
              {`Total Score: `}
            </Text>
            <Text as='span' data-cy='total-score-value'>
              {todaysSurvey?.pointsEarned || 0}
            </Text>
            {/* TODO Replace with totalScore */}
          </Box>

          {surveyData &&
            surveyData.docs.length > 0 &&
            surveyData.docs.map(survey => {
              return <Text key={survey.id}>{survey.id}</Text>
            })}
        </Stack>
      }
    />
  )
}

export default Calendar
