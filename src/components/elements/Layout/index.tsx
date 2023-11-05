import * as React from 'react'

import { Container, Flex } from '@chakra-ui/react'
import TopNav from '@components/elements/TopNav'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <Flex direction='column'>
      <TopNav />
      <Container>{children}</Container>
    </Flex>
  )
}

export default Layout
