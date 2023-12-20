import { Flex, Spinner } from '@chakra-ui/react'
import { Layout } from '@root/components/elements/Layout'
import * as React from 'react'

const FullscreenLoader: React.FC = () => {
  return (
    <Layout
      bottomContent={
        <Flex
          position='fixed'
          top={0}
          right={0}
          bottom={0}
          left={0}
          alignItems='center'
          justifyContent='center'
        >
          <Spinner color='brand.300' />
        </Flex>
      }
    />
  )
}

export default FullscreenLoader
