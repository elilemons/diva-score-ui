import { Flex } from '@chakra-ui/react'
import { useAuth } from '@root/components/appProviders/Auth'
import { Layout } from '@root/components/elements/Layout'
import * as React from 'react'

const TermsOfService: React.FC = () => {
  const { user } = useAuth()

  return (
    <Layout
      hideBottomNav={!user}
      bottomContent={
        <Flex height='100vh' flexDirection='column'>
          <iframe
            src='/terms-of-service.html'
            title='Terms of Service'
            width='100%'
            height='100%'
          ></iframe>
        </Flex>
      }
    />
  )
}

export default TermsOfService
