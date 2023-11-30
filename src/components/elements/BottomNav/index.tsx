import { Flex, IconButton } from '@chakra-ui/react'
import { APP_ROUTES } from '@root/appRoutes'
import { APP_PADDING } from '@root/utils/appStyling'
import * as React from 'react'
import { BsCalendar2HeartFill } from 'react-icons/bs'
import { FaUserAstronaut } from 'react-icons/fa'
import { GiSharpCrown } from 'react-icons/gi'
import { useLocation } from 'react-router-dom'

export const BottomNav: React.FC = () => {
  const location = useLocation()
  const [active, setActive] = React.useState<'calendar' | 'dashboard' | 'account' | null>()

  React.useEffect(() => {
    if (location && location.pathname) {
      if (location.pathname.includes('calendar')) {
        setActive('calendar')
      } else if (location.pathname.includes('dashboard')) {
        setActive('dashboard')
      } else if (location.pathname.includes('account')) {
        setActive('account')
      }
    }
  }, [location])

  return (
    <Flex
      position='absolute'
      left={0}
      bottom={0}
      height={14}
      width='100%'
      bg='brand.700'
      bgGradient='radial(brand.500, brand.700)'
      alignItems='center'
      justifyContent='space-between'
      px={APP_PADDING.px}
    >
      <IconButton
        bg='none'
        isActive={active === 'calendar'}
        _active={{
          bg: 'brand.500',
        }}
        _hover={{
          bg: 'brand.500',
        }}
        colorScheme='whiteAlpha.700'
        size='lg'
        icon={<BsCalendar2HeartFill />}
        aria-label={'Calendar (View past surveys and scores)'}
        as='a'
        href='/calendar'
      />
      <IconButton
        bg='none'
        isActive={active === 'dashboard'}
        _active={{
          bg: 'brand.500',
        }}
        _hover={{
          bg: 'brand.500',
        }}
        colorScheme='white'
        size='lg'
        icon={<GiSharpCrown />}
        aria-label={'Dashboard - Start, edit, or view todays entry'}
        as='a'
        href={APP_ROUTES.authenticated.dashboard}
      />
      <IconButton
        bg='none'
        isActive={active === 'account'}
        _active={{
          bg: 'brand.500',
        }}
        _hover={{
          bg: 'brand.500',
        }}
        colorScheme='white'
        size='lg'
        icon={<FaUserAstronaut />}
        aria-label={'Account - manage account information'}
        as='a'
        href={APP_ROUTES.authenticated.account}
      />
    </Flex>
  )
}
