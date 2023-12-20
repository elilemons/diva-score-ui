import { Box, Flex, Heading, IconButton } from '@chakra-ui/react'
import { colors } from '@root/theme/colors'
import * as React from 'react'
import ReactConfetti from 'react-confetti'
import { IoCloseOutline } from 'react-icons/io5'

type SurveyScoreAnimationProps = {
  score?: number
  onClose: () => void
  width: number
  height: number
}
export const SurveyScoreAnimation: React.FC<SurveyScoreAnimationProps> = ({
  score = 0,
  width,
  height,
  onClose,
}) => {
  return (
    <Box
      data-cy='score-animation'
      bgGradient='linear(to-b, brand.500, brand.700)'
      width={width}
      height={height}
      position='relative'
    >
      <ReactConfetti
        colors={[
          colors.brand[100],
          colors.brand[200],
          colors.brand[300],
          colors.brand[500],
          colors.accent[100],
          colors.accent[200],
          colors.accent[300],
          colors.accent[500],
        ]}
        style={{
          zIndex: 2,
        }}
      />
      <Flex alignItems='center' justifyContent='center' height='100%' position='relative'>
        <Heading color='white'>You Scored: {score}</Heading>
      </Flex>
      <IconButton
        aria-label='Close Score Animation'
        data-cy='close-score-animation'
        onClick={onClose}
        icon={<IoCloseOutline size='lg' color='white' />}
        position='absolute'
        top={15}
        right={15}
        zIndex={3}
        variant='text'
        isRound={true}
      />
    </Box>
  )
}
