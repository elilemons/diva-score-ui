/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex, Icon, Text, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react'
import { APP_ROUTES } from '@root/appRoutes'
import { APP_BOX_SHADOW, APP_PADDING } from '@root/utils/appStyling'
import * as React from 'react'
import { BsCalendar2HeartFill } from 'react-icons/bs'
import { FaUserAstronaut } from 'react-icons/fa'
import { GiSharpCrown } from 'react-icons/gi'
import { Link, useHistory, useLocation } from 'react-router-dom'

const BottomNav: React.FC = () => {
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
      height={16}
      width='100%'
      maxWidth='800px'
      bg='brand.700'
      alignItems='center'
      justifyContent='space-between'
      data-cy='bottom-nav'
      boxShadow={APP_BOX_SHADOW.boxShadow}
    >
      {['calendar', 'dashboard', 'account'].map((item, index) => (
        <LinkBox
          key={index}
          height='100%'
          width='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
          bg={active === item ? 'brand.400' : 'brand.700'}
          color={active === item ? 'white' : 'whiteAlpha.700'}
          borderBottom={'5px solid'}
          borderColor={active === item ? 'white' : 'transparent'}
          transition={'border-color 0.3s ease-in-out'}
          _active={{
            bg: 'brand.400',
          }}
          _hover={{
            borderColor: 'white',
            color: 'white',
          }}
        >
          <LinkOverlay as={Link} to={getLink(item)}>
            <Stack alignItems='center'>
              <Icon
                as={getIcon(item)}
                aria-label={`Link to ${item.charAt(0).toUpperCase() + item.slice(1)}`}
                w={5}
                h={5}
              />
              <Text fontSize='small'>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
            </Stack>
          </LinkOverlay>
        </LinkBox>
      ))}
    </Flex>
  )
}

export default BottomNav
