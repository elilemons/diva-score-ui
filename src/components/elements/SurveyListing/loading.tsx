import { Badge, Box, Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { APP_PADDING } from '@root/utils/appStyling'
import * as React from 'react'

type Props = {
  backgroundColor?: string
}

export const SurveyListingSkeleton: React.FC<Props> = ({ backgroundColor = 'white' }) => {
  return (
    <Box
      height='75'
      pt={1}
      px={APP_PADDING.px}
      data-cy='survey-listing-skeleton'
      bgColor={backgroundColor}
    >
      <Flex alignItems='center' justifyContent='space-between' width='100% '>
        <Flex alignItems='center' py={1} gap={4}>
          <SkeletonCircle size='50' />
          <SkeletonText noOfLines={2} skeletonHeight='2' width='115px' />
        </Flex>
        <Skeleton startColor='accent.100'>
          <Badge>+00</Badge>
        </Skeleton>
      </Flex>
    </Box>
  )
}
