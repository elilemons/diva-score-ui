import * as React from 'react'

import { Container, Flex, Stack } from '@chakra-ui/react'
import { Logo } from '@components/elements/Logo'
import { BottomNav } from '@root/components/elements/BottomNav'
import { APP_CONTAINER_WIDTH, APP_PADDING } from '@utils/appStyling'

type Props = {
  bottomContent: React.ReactNode
  hideBottomNav?: boolean
  topContent?: React.ReactNode
  innerBottomContainerPadding?: { px?: string; py?: string }
}

export const Layout: React.FC<Props> = ({
  bottomContent,
  topContent = true,
  hideBottomNav = false,
  innerBottomContainerPadding,
}: Props) => {
  return (
    <Flex
      className={'outer-container'}
      backgroundColor='brand.500'
      bgGradient='linear(to-br, accent.500, brand.500, brand.700)'
      height='auto'
      minHeight='100%'
      flexFlow='column'
      alignItems='center'
    >
      <Stack
        color='white'
        className='top-container'
        alignItems='center'
        height='100%'
        width={{ base: '100%' }}
      >
        <Flex
          className='inner-top-container'
          minWidth={APP_CONTAINER_WIDTH.minWidth}
          direction='column'
          px={APP_PADDING.px}
          pt={APP_PADDING.pt}
          pb={APP_PADDING.pb}
          width={APP_CONTAINER_WIDTH.width}
        >
          <Logo />
          {topContent && topContent}
        </Flex>
      </Stack>
      <Flex
        className='bottom-container'
        alignItems='center'
        height='100%'
        direction='column'
        justifyContent={'stretch'}
        flex={1}
        width={{ base: '100%' }}
      >
        <Container
          as='main'
          role='main'
          position='relative'
          backgroundColor='white'
          className='inner-bottom-container'
          height='100%'
          flex={1}
          minWidth={APP_CONTAINER_WIDTH.minWidth}
          px={innerBottomContainerPadding?.px || APP_PADDING.px}
          py={innerBottomContainerPadding?.py || APP_PADDING.py}
          width={APP_CONTAINER_WIDTH.width}
        >
          {bottomContent}
          {!hideBottomNav && <BottomNav />}
        </Container>
      </Flex>
    </Flex>
  )
}
