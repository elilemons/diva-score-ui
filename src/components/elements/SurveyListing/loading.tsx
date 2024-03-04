import { Badge, Box, Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { APP_PADDING } from '@root/utils/appStyling'
import * as React from 'react'

export const SurveyListingSkeleton: React.FC = () => {
  return (
    <Box px={APP_PADDING.px}>
      <Flex alignItems='center' justifyContent='space-between' width='100% '>
        <Flex alignItems='center' py={1} gap={4}>
          <SkeletonCircle size='50' />
          <SkeletonText noOfLines={2} skeletonHeight='2' width='115px' />
        </Flex>
        <Skeleton>
          <Badge>+00</Badge>
        </Skeleton>
      </Flex>
    </Box>
  )
}
