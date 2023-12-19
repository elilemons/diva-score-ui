import { Heading } from '@chakra-ui/react'
import { Layout } from '@root/components/elements/Layout'
import * as React from 'react'

const FullscreenLoader: React.FC = () => {
  return (
    <Layout
      isLoaded={false}
      topContent={<Heading data-cy='loading'>Loading...</Heading>}
      bottomContent={<></>}
    />
  )
}

export default FullscreenLoader
