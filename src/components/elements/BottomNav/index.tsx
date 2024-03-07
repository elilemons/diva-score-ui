/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex, Icon, IconButton, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { APP_ROUTES } from '@root/appRoutes'
import { APP_BOX_SHADOW, APP_PADDING } from '@root/utils/appStyling'
import * as React from 'react'
import { BsCalendar2HeartFill } from 'react-icons/bs'
import { FaUserAstronaut } from 'react-icons/fa'
import { GiSharpCrown } from 'react-icons/gi'
import { Link, useHistory, useLocation } from 'react-router-dom'

export const BottomNav: React.FC = () => {
  const location = useLocation()
  const [active, setActive] = React.useState<'calendar' | 'dashboard' | 'account' | null>()

  const getIcon = (item: string) => {
    switch (item) {
      case 'calendar':
        return BsCalendar2HeartFill
      case 'dashboard':
        return GiSharpCrown
      case 'account':
        return FaUserAstronaut
    }
  }
  const getLink = (item: string) => {
    switch (item) {
      case 'calendar':
        return APP_ROUTES.authenticated.calendar
      case 'dashboard':
        return APP_ROUTES.authenticated.dashboard
      case 'account':
        return APP_ROUTES.authenticated.account
    }
  }

  React.useEffect(() => {
    if (location && location.pathname) {
      if (location.pathname.includes('calendar')) {
        setActive('calendar')
      } else if (location.pathname.includes('dashboard') || location.pathname.includes('survey')) {
        setActive('dashboard')
      } else if (location.pathname.includes('account')) {
        setActive('account')
      }
    }
  }, [location])

  return (
    <Flex
      position='sticky'
      left={0}
      bottom={0}
      height={14}
      width='800px'
      bg='brand.700'
      alignItems='center'
      justifyContent='space-between'
      data-cy='bottom-nav'
      boxShadow={APP_BOX_SHADOW.boxShadow}
    >
      {['calendar', 'dashboard', 'account'].map(item => (
        <LinkBox
          height='100%'
          width='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
          bg={active === item ? 'brand.400' : 'brand.700'}
          _active={{
            bg: 'brand.400',
          }}
          _hover={{
            bg: active === item ? 'brand.700' : 'brand.400',
          }}
        >
          <LinkOverlay as={Link} to={getLink(item)}>
            <Icon
              color={active === item ? 'white' : 'whiteAlpha.700'}
              as={getIcon(item)}
              aria-label='Link to Calendar'
              w={6}
              h={6}
              _hover={{
                color: active === item ? 'whiteAlpha.700' : 'white',
              }}
            />
          </LinkOverlay>
        </LinkBox>
      ))}
    </Flex>
  )
}
