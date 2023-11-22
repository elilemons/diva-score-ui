import { Heading } from '@chakra-ui/react'
import { APP_ROUTES } from '@root/appRoutes'
import * as React from 'react'
import { Link } from 'react-router-dom'

export const Logo: React.FC = () => {
  return (
    <Heading size={{ sm: 'sm', md: 'md' }}>
      <Link to={APP_ROUTES.global.home}>DIVA Score</Link>
    </Heading>
  )
}
