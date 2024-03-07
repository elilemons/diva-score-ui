import { Box, Image } from '@chakra-ui/react'
import { APP_ROUTES } from '@root/appRoutes'
import { APP_PADDING } from '@root/utils/appStyling'
import * as React from 'react'
import { Link } from 'react-router-dom'

export const Logo: React.FC = () => {
  return (
    <Box py={APP_PADDING.pb}>
      <Link to={APP_ROUTES.global.home}>
        <Image
          src='/logo.png'
          alt='Divinely Inspired Vision and Actions'
          height='75px'
          filter='drop-shadow(1px 1px 1px #222)'
        />
      </Link>
    </Box>
  )
}
