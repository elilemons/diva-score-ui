import * as React from 'react'

import { Container, Flex, Stack } from '@chakra-ui/react'
import { Logo } from '@components/elements/Logo'
import { APP_CONTAINER_WIDTH, APP_PADDING, APP_SPACING } from '@utils/appStyling'

type Props = {
  bottomContent: React.ReactNode
  topContent: React.ReactNode
}

export const Layout: React.FC<Props> = ({ bottomContent, topContent = true }: Props) => {
  return (
    <Flex
      className={'outer-container'}
      backgroundColor='brand.500'
      bgGradient='linear(to-br, accent.500, brand.500, brand.700)'
      height='100%'
      direction='column'
      alignItems='center'
    >
      <Stack
        alignContent='center'
        className='top-content'
        color='white'
        justifyContent={'center'}
        minWidth={APP_CONTAINER_WIDTH.minWidth}
        px={APP_PADDING.px}
        pt={APP_PADDING.pt}
        pb={APP_PADDING.pb}
        spacing={APP_SPACING.spacing}
        width={APP_CONTAINER_WIDTH.width}
      >
        <Logo />
        {topContent}
      </Stack>
      <Flex
        className='bottom-container'
        alignItems='center'
        height='100%'
        direction='column'
        justifyContent={'stretch'}
        width={{ base: '100%' }}
      >
        <Container
          backgroundColor='white'
          className='inner-container'
          height='100%'
          minWidth={APP_CONTAINER_WIDTH.minWidth}
          px={APP_PADDING.px}
          py={APP_PADDING.py}
          width={APP_CONTAINER_WIDTH.width}
        >
          {bottomContent}
        </Container>
      </Flex>
    </Flex>
  )
}
