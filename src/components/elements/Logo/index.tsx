import { Heading } from '@chakra-ui/react'
import { APP_ROUTES } from '@root/appRoutes'
import * as React from 'react'
import { Link } from 'react-router-dom'

export const Logo: React.FC = () => {
  // TODO Remove this test code
  console.log('ELITEST Logo')
  // ^ TODO Remove this test code

  return (
    <Heading size={{ sm: 'sm', md: 'md' }}>
      <Link to={APP_ROUTES.global.home}>DIVA Score</Link>
    </Heading>
  )
}
