import {
  Badge,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Input,
  Skeleton,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { APP_SPACING } from '@root/utils/appStyling'
import * as React from 'react'

export const SurveyLoadingSkeleton: React.FC = () => {
  return (
    <Stack spacing={APP_SPACING.spacing}>
      <Flex alignItems='flex-start' gap={2}>
        <Skeleton>
          <Heading>Body</Heading>
        </Skeleton>
        <Skeleton>
          <Badge colorScheme='green'>0</Badge>
        </Skeleton>
      </Flex>
      <Divider color='brand.300' />

      <Skeleton>
        <Checkbox>Question 1</Checkbox>
      </Skeleton>
      <Skeleton>
        <Checkbox>Question 2</Checkbox>
      </Skeleton>
      <Divider color='brand.300' />

      <Flex alignItems='flex-start' gap={2}>
        <Skeleton>
          <Heading>Mind</Heading>
        </Skeleton>
        <Skeleton>
          <Badge colorScheme='green'>0</Badge>
        </Skeleton>
      </Flex>
      <Skeleton>
        <Checkbox>Question 1</Checkbox>
      </Skeleton>
      <Divider color='brand.300' />

      <Flex alignItems='flex-start' gap={2}>
        <Skeleton>
          <Heading>Spirit</Heading>
        </Skeleton>
      </Flex>
      <Skeleton>
        <Input />
      </Skeleton>
      <Divider color='brand.300' />

      <Flex alignItems='flex-start' gap={2}>
        <Skeleton>
          <Heading>Connection</Heading>
        </Skeleton>
      </Flex>
      <Skeleton>
        <Checkbox>Question 1</Checkbox>
      </Skeleton>
      <Divider color='brand.300' />

      <Flex alignItems='flex-start' gap={2}>
        <Skeleton>
          <Heading>Goals</Heading>
        </Skeleton>
      </Flex>
      <Skeleton>
        <Input />
      </Skeleton>
      <Divider color='brand.300' />

      <Flex alignItems='flex-start' gap={2}>
        <Skeleton>
          <Heading>Goals</Heading>
        </Skeleton>
      </Flex>
      <Skeleton>
        <Input />
      </Skeleton>
      <Divider color='brand.300' />

      <Flex alignItems='flex-start' gap={2}>
        <Skeleton>
          <Heading>Other</Heading>
        </Skeleton>
      </Flex>
      <Skeleton>
        <Textarea />
      </Skeleton>
      <Divider color='brand.300' />
    </Stack>
  )
}
