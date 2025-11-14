import { CheckCircleIcon } from '@chakra-ui/icons'
import {
  Button,
  Link as ChakraLink,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useAuth } from '@components/appProviders/Auth'
import { Layout } from '@components/elements/Layout'
import { APP_ROUTES } from '@root/appRoutes'
import { getTotalGoalsQuery } from '@root/queries/survey/getTotalGoalsQuery'
import { getTotalUsersQuery } from '@root/queries/user/getTotalUsersQuery'
import {
  APP_BRAND_GRADIENT,
  APP_PAGE_DESCRIPTIONS,
  APP_PAGE_HEADINGS,
  APP_SPACING,
} from '@utils/appStyling'
import * as React from 'react'
import { Link } from 'react-router-dom'

const LandingPage: React.FC = () => {
  const { user } = useAuth()
  const { data: totalGoalsData, isLoading: totalGoalsLoading } = getTotalGoalsQuery()
  const { data: totalUsersData, isLoading: totalUsersLoading } = getTotalUsersQuery()

  return (
    <Layout
      showBottomNav={!!user}
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Text align='right'>
            Already have an account?{' '}
            <strong>
              <ChakraLink
                data-cy='landing-page-bottom-login'
                color={'brand.500'}
                as={Link}
                to={
                  !user
                    ? `${APP_ROUTES.unauthenticated.login}`
                    : `${APP_ROUTES.authenticated.dashboard}`
                }
              >
                {!user ? 'Log in' : 'Visit Dashboard'}
              </ChakraLink>
            </strong>
          </Text>
          <Stack align='center' spacing={APP_SPACING.spacing}>
            <Heading as='h1' size={APP_PAGE_HEADINGS.size} ml={APP_PAGE_HEADINGS.ml}>
              Track Your Daily DIVA Score &mdash; Reflect and Elevate Your Self-Care Journey
            </Heading>
            <Text fontSize={APP_PAGE_DESCRIPTIONS.fontSize}>
              5 simple daily check-ins on Body, Mind, Spirit, Connection, and Goals. <br />
              Get your personalized DIVA Self-Care Score and stay accountable to what really
              matters.
            </Text>
            <Button
              data-cy='landing-page-signup'
              as={Link}
              to={
                user
                  ? `${APP_ROUTES.authenticated.dashboard}?message=already-signed-up`
                  : APP_ROUTES.unauthenticated.signup
              }
              colorScheme='brand'
              bgGradient={APP_BRAND_GRADIENT.bgGradient}
              size='lg'
              width={'100%'}
            >
              Start your DIVA Score Journey
            </Button>
          </Stack>
          <Stack spacing={APP_SPACING.spacing}>
            <Stack spacing={3.5}>
              <Text align='center' fontSize={APP_PAGE_DESCRIPTIONS.fontSize}>
                The DIVA Score app has helped{' '}
                {totalUsersLoading ? (
                  <Spinner size='xs' color='accent.500' data-cy='total-users-loading' />
                ) : (
                  <strong
                    style={{
                      color: `var(--chakra-colors-accent-500)`,
                    }}
                  >
                    {totalUsersData?.totalUsers}
                  </strong>
                )}{' '}
                people accomplish{' '}
                {totalGoalsLoading ? (
                  <Spinner size='xs' color='brand.500' data-cy='total-users-loading' />
                ) : (
                  <strong
                    style={{
                      color: `var(--chakra-colors-brand-500)`,
                    }}
                  >
                    {totalGoalsData?.totalGoals}
                  </strong>
                )}{' '}
                goals.
              </Text>
              <Text align='center' fontSize={APP_PAGE_DESCRIPTIONS.fontSize}>
                Join the self care movement with us!
              </Text>
            </Stack>
            <iframe
              width={'100%'}
              height='315'
              src='https://www.youtube.com/embed/GbvUCjkSAeo?si=WAbezTcM69Mg4iJE'
              title='DIVA Score App'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </Stack>
          {/* What is DIVA Score? */}
          <>
            <Heading as='h2' size={APP_PAGE_HEADINGS.size} ml={APP_PAGE_HEADINGS.ml}>
              What is DIVA Score?
            </Heading>
            <Text as='p' fontSize={APP_PAGE_DESCRIPTIONS.fontSize}>
              The DIVA Score app is your daily companion to measure and improve your self-care. By
              answering five quick questions every day, you earn points towards your daily score:
            </Text>
            <List as='ul' fontSize={APP_PAGE_DESCRIPTIONS.fontSize} listStylePosition={'outside'}>
              <ListItem as='li' pb='1.5'>
                <Flex alignContent='flex-start'>
                  <ListIcon as={CheckCircleIcon} color='accent.500' />
                  <Text mt={-1}>Track your physical, mental, and spiritual well-being</Text>
                </Flex>
              </ListItem>
              <ListItem as='li' pb='1.5'>
                <Flex alignContent='flex-start'>
                  <ListIcon as={CheckCircleIcon} color='accent.500' />
                  <Text mt={-1}>Stay accountable to your goals and connections</Text>
                </Flex>
              </ListItem>
              <ListItem as='li' pb='1.5'>
                <Flex alignContent='flex-start'>
                  <ListIcon as={CheckCircleIcon} color='accent.500' />
                  <Text mt={-1}>Build gratitude and reflection into your routine</Text>
                </Flex>
              </ListItem>
              <ListItem as='li' pb='1.5'>
                <Flex alignContent='flex-start'>
                  <ListIcon as={CheckCircleIcon} color='accent.500' />
                  <Text mt={-1}>
                    See your progress over time &mdash; one day, one score, one breakthrough at a
                    time
                  </Text>
                </Flex>
              </ListItem>
            </List>
          </>
          {/* Why You'll Love It */}
          <>
            <Heading as='h2' size={APP_PAGE_HEADINGS.size} ml={APP_PAGE_HEADINGS.ml}>
              Why You'll Love It
            </Heading>
            <List as='ul' fontSize={APP_PAGE_DESCRIPTIONS.fontSize} listStylePosition={'outside'}>
              <ListItem as='li' pb='1.5'>
                <Flex alignContent='flex-start'>
                  <ListIcon as={CheckCircleIcon} color='accent.500' />
                  <Text as={'p'} mt={-1}>
                    <strong>Simple & Fast:</strong> Just 5 questions a day with meaningful impact
                  </Text>
                </Flex>
              </ListItem>
              <ListItem as='li' pb='1.5'>
                <Flex alignContent='flex-start'>
                  <ListIcon as={CheckCircleIcon} color='accent.500' />
                  <Text as={'p'} mt={-1}>
                    <strong>Stay Motivated:</strong> Watch your DIVA Score grow as you build healthy
                    habits
                  </Text>
                </Flex>
              </ListItem>
              <ListItem as='li' pb='1.5'>
                <Flex alignContent='flex-start'>
                  <ListIcon as={CheckCircleIcon} color='accent.500' />
                  <Text as={'p'} mt={-1}>
                    <strong>Connect &amp; Compete:</strong> Share scores with friends and your own
                    DIVA community for fun accountability
                  </Text>
                </Flex>
              </ListItem>
              <ListItem as='li' pb='1.5'>
                <Flex alignContent='flex-start'>
                  <ListIcon as={CheckCircleIcon} color='accent.500' />
                  <Text as={'p'} mt={-1}>
                    <strong>Reflect &amp; Grow:</strong> Use our journal space to capture thoughts,
                    gratitude, and intentions
                  </Text>
                </Flex>
              </ListItem>
            </List>
          </>
          {/* How It Works */}
          <>
            <Heading as='h2' size={APP_PAGE_HEADINGS.size} ml={APP_PAGE_HEADINGS.ml}>
              How It Works: 3 Easy Steps
            </Heading>
            <List fontSize={APP_PAGE_DESCRIPTIONS.fontSize} listStylePosition={'outside'}>
              <ListItem as='li' pb='1.5'>
                <Flex alignContent='flex-start'>
                  <ListIcon as={CheckCircleIcon} color='accent.500' />
                  <Text as={'p'} mt={-1}>
                    Login daily and answer 5 daily self-care questions
                  </Text>
                </Flex>
              </ListItem>
              <ListItem as='li' pb='1.5'>
                <Flex alignContent='flex-start'>
                  <ListIcon as={CheckCircleIcon} color='accent.500' />
                  <Text as={'p'} mt={-1}>
                    Get your unique DIVA Score &mdash; a reflection of your day
                  </Text>
                </Flex>
              </ListItem>
              <ListItem as='li' pb='1.5'>
                <Flex alignContent='flex-start'>
                  <ListIcon as={CheckCircleIcon} color='accent.500' />
                  <Text as={'p'} mt={-1}>
                    Track your journey on your dashboard, stay inspired, and keep growing
                  </Text>
                </Flex>
              </ListItem>
            </List>
          </>
          {/* Join Us! */}
          <>
            <Heading as='h2' size={APP_PAGE_HEADINGS.size} ml={APP_PAGE_HEADINGS.ml}>
              Join Thousands of DIVAs Investing in Themselves
            </Heading>
            <Text as={'p'} fontSize={APP_PAGE_DESCRIPTIONS.fontSize}>
              Start your journey today. It’s free, simple, and designed just for you.
            </Text>
            <Button
              as={Link}
              size='lg'
              data-cy='landing-page-signup-2'
              to={
                user
                  ? `${APP_ROUTES.authenticated.dashboard}?message=already-signed-up`
                  : APP_ROUTES.unauthenticated.signup
              }
              colorScheme='accent'
              bgGradient={APP_BRAND_GRADIENT.bgGradient}
            >
              Create My DIVA Score Account
            </Button>
            <Text align='center'>
              Already have an account?{' '}
              <strong>
                <ChakraLink
                  data-cy='landing-page-bottom-login'
                  color={'brand.500'}
                  as={Link}
                  to={
                    !user
                      ? `${APP_ROUTES.unauthenticated.login}`
                      : `${APP_ROUTES.authenticated.dashboard}`
                  }
                >
                  {!user ? 'Log in' : 'Visit Dashboard'}
                </ChakraLink>
              </strong>
            </Text>
          </>
          <>
            <Text textAlign='center' as='p'>
              For more details on the DIVA Score App and other projects visit us at:{' '}
              <strong>
                <ChakraLink isExternal href='www.TechDivaSuccess.com/app' color='accent.500'>
                  www.TechDivaSuccess.com/app
                </ChakraLink>
              </strong>
            </Text>
          </>
        </Stack>
      }
    />
  )
}

export default LandingPage
