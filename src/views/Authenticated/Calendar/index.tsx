import {
  Stack,
  Heading,
  Text,
  Box,
  Icon,
  Circle,
  Flex,
  Badge,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react'
import { APP_ROUTES } from '@root/appRoutes'
import { Layout } from '@root/components/elements/Layout'
import { getSurveyByIdQuery } from '@root/queries/survey/getSurveyByIdQuery'
import { getTodaysSurveyQuery } from '@root/queries/survey/getTodaysSurveyQuery'
import { getUsersSurveysQuery } from '@root/queries/survey/getUsersSurveysQuery'
import { APP_SPACING, APP_INNER_HEADINGS, APP_PADDING } from '@root/utils/appStyling'
import formatDate, { displayTypes } from '@root/utils/formatDate'
import * as React from 'react'
import { GiNotebook } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const Calendar: React.FC = () => {
  const { data: userSurveyData } = getUsersSurveysQuery({ limit: 10 })
  // const { data: totalScore } = getUsersTotalScore()
  const { data: todaysSurveyId } = getTodaysSurveyQuery()
  const { data: todaysSurvey } = getSurveyByIdQuery({ surveyId: todaysSurveyId?.id })
  // TODO Remove this test code
  console.log('ELITEST Calendar', { userSurveyData })
  // ^ TODO Remove this test code

  return (
    <Layout
      innerBottomContainerPadding={{ px: '0' }}
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Stack px={APP_PADDING.px}>
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
          </Stack>
          <Box pt={1}>
            {userSurveyData &&
              userSurveyData.docs.length > 0 &&
              userSurveyData.docs.map((survey, index) => {
                return (
                  <LinkBox
                    bgColor={index % 2 === 0 ? 'white' : 'gray.100'}
                    _hover={{ bgColor: 'brand.100' }}
                    w={'100%'}
                    px={APP_PADDING.px}
                  >
                    <Flex alignItems='center' justifyContent='space-between'>
                      <Flex alignItems='center'>
                        <LinkOverlay
                          as={Link}
                          to={`${APP_ROUTES.authenticated.survey}/${survey.id}`}
                        >
                          <Circle color='brand.500' p={4}>
                            <Icon aria-label='Link to view survey' as={GiNotebook} w={35} h={35} />
                          </Circle>
                        </LinkOverlay>
                        <Box>
                          <Text>
                            {formatDate(survey.surveyDate, displayTypes.MONTHNAME_DAY_YEAR)}
                          </Text>
                          <Text color='gray'>
                            {formatDate(survey.surveyDate, displayTypes.TIME_AM_PM)}
                          </Text>
                        </Box>
                      </Flex>
                      <Box>
                        <Badge colorScheme='green'>+{survey.pointsEarned}</Badge>
                      </Box>
                    </Flex>
                  </LinkBox>
                )
              })}
          </Box>
        </Stack>
      }
    />
  )
}

export default Calendar
