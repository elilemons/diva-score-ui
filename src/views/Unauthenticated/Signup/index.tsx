import { Heading, ListItem, Stack, Text, UnorderedList, Link as ChakraLink } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { ControlledPasswordInput } from '@components/forms/fields/Password/Controlled'
import { ControlledRetypeInput } from '@components/forms/fields/Retype/Controlled'
import { Submit } from '@components/forms/Submit'
import { User } from '@elilemons/diva-score-lib'
import { APP_ROUTES } from '@root/appRoutes'
import { ControlledTextInput } from '@root/components/forms/fields/Text/Controlled'
import { createUserMutation } from '@root/queries/user/createUserMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { APP_BRAND_BUTTON, APP_INNER_HEADINGS, APP_SPACING } from '@utils/appStyling'
import { toastErrors } from '@utils/toastErrors'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
type UserSignup = {
  confirmPassword: string
} & User

const SignUp: React.FC = () => {
  const { control, getValues, handleSubmit } = useForm<Partial<UserSignup>>()
  const history = useHistory()

  const createUser = createUserMutation({ mutationKey: 'sign-up-form' })

  const onSubmit: SubmitHandler<Partial<UserSignup>> = async data => {
    try {
      await createUser
        .mutateAsync({
          data,
        })
        .then(() => {
          history.push(`${APP_ROUTES.unauthenticated.signupSuccess}`)
        })
    } catch (e) {
      const error = e as GenericStatusErrorType
      toastErrors({
        error,
        id: 'sign-up-error',
        title: 'Account Creation Error',
        description: 'There was an error creating your account, please try again.',
      })
    }
  }

  return (
    <Layout
      showBottomNav={false}
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading as='h1' size={APP_INNER_HEADINGS.size}>
            Sign Up for DIVA Score
          </Heading>

          <form
            id='signup-form'
            aria-label='sign-up-form-label'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Stack spacing={APP_SPACING.spacing}>
              <ControlledTextInput control={control} required label='First Name' name='firstName' />
              <ControlledTextInput control={control} required label='Last Name' name='lastName' />
              <ControlledEmailInput control={control} required label='Email' name='email' />
              <ControlledPasswordInput
                control={control}
                required
                label='Password'
                name='password'
              />
              <Stack spacing={4}>
                <ControlledRetypeInput
                  control={control}
                  getValues={getValues}
                  required
                  name='confirmPassword'
                  label='Confirm Password'
                  placeholder='Confirm Password'
                  matchFieldName='password'
                  matchFieldType='password'
                />

                <Text>Your password must have:</Text>
                <UnorderedList spacing={2}>
                  <ListItem>8 characters or more</ListItem>
                  <ListItem>At least 1 capital letter</ListItem>
                  <ListItem>At least 1 special character</ListItem>
                </UnorderedList>
              </Stack>
              <Submit
                label='Sign up'
                control={control}
                colorScheme={APP_BRAND_BUTTON.colorScheme}
                bgGradient={APP_BRAND_BUTTON.bgGradient}
              />
              <Text align='center'>
                Already have an account?{' '}
                <ChakraLink
                  color={'brand.500'}
                  as={Link}
                  to={`${APP_ROUTES.unauthenticated.login}`}
                >
                  Log in
                </ChakraLink>
              </Text>
              <Text align='center' fontSize='xs'>
                By signing up, you agree to our{' '}
                <ChakraLink isExternal to='/terms-of-service' as={Link}>
                  <Text as='u' color='accent.500'>
                    Terms of Service
                  </Text>{' '}
                </ChakraLink>
                and{' '}
                <ChakraLink isExternal to='/privacy-policy' as={Link}>
                  <Text as='u' color='accent.500'>
                    Privacy Policy
                  </Text>
                </ChakraLink>
              </Text>
            </Stack>
          </form>
        </Stack>
      }
    />
  )
}

export default SignUp
