import * as React from 'react'

import { Button, Container, Flex, Stack } from '@chakra-ui/react'
import { useAuth } from '@components/appProviders/Auth'
import { Logo } from '@components/elements/Logo'
import { APP_CONTAINER_WIDTH, APP_PADDING } from '@utils/appStyling'

type Props = {
  bottomContent: React.ReactNode
  topContent?: React.ReactNode
}

export const Layout: React.FC<Props> = ({ bottomContent, topContent = true }: Props) => {
  const { user, logOut } = useAuth()
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
        color='white'
        className='top-container'
        alignItems='center'
        height='100%'
        flex={1}
        width={{ base: '100%' }}
      >
        <Flex
          minWidth={APP_CONTAINER_WIDTH.minWidth}
          direction='column'
          px={APP_PADDING.px}
          pt={APP_PADDING.pt}
          pb={APP_PADDING.pb}
          width={APP_CONTAINER_WIDTH.width}
          alignContent='space-between'
        >
          <Logo />
          {user && (
            <Button data-cy='logout' onClick={() => logOut()}>
              Logout
            </Button>
          )}
          {topContent && topContent}
        </Flex>
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
