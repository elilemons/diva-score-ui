import { Box, LinkBox, Flex, LinkOverlay, Circle, Icon, Badge, Text } from '@chakra-ui/react'
import { Survey } from '@elilemons/diva-score-lib'
import { APP_ROUTES } from '@root/appRoutes'
import { APP_PADDING } from '@root/utils/appStyling'
import formatDate, { displayTypes } from '@root/utils/formatDate'
import { GiNotebook } from 'react-icons/gi'
import { Link } from 'react-router-dom'

type Props = {
  backgroundColor: string
  survey: Survey
}

export const SurveyListing: React.FC<Props> = ({ backgroundColor, survey }) => {
  return (
    <LinkBox
      bgColor={backgroundColor}
      _hover={{ bgColor: 'brand.100' }}
      w={'100%'}
      px={APP_PADDING.px}
    >
      <Flex alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <LinkOverlay as={Link} to={`${APP_ROUTES.authenticated.survey}/${survey.id}`}>
            <Circle color='brand.500' p={4} data-cy={`survey-icon-${survey.id}`}>
              <Icon aria-label='Link to view survey' as={GiNotebook} w={35} h={35} />
            </Circle>
          </LinkOverlay>
          <Box>
            <Text data-cy={`survey-date-${survey.id}`}>
              {formatDate(survey.surveyDate, displayTypes.MONTHNAME_DAY_YEAR)}
            </Text>
            <Text color='gray' data-cy={`survey-time-${survey.id}`}>
              {formatDate(survey.surveyDate, displayTypes.TIME_AM_PM)}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Badge colorScheme='green' data-cy={`survey-points-${survey.id}`}>
            +{survey.pointsEarned}
          </Badge>
        </Box>
      </Flex>
    </LinkBox>
  )
}
