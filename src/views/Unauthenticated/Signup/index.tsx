import { Heading, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { ControlledPasswordInput } from '@components/forms/fields/Password/Controlled'
import { ControlledRetypeInput } from '@components/forms/fields/Retype/Controlled'
import { Submit } from '@components/forms/Submit'
import { User } from '@elilemons/diva-score-lib'
import { APP_ROUTES } from '@root/appRoutes'
import { createUserMutation } from '@root/queries/user/createUserMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { APP_BRAND_BUTTON, APP_FORM_HEADINGS, APP_SPACING } from '@utils/appStyling'
import { canLoop } from '@utils/canLoop'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
type UserSignup = {
  confirmPassword: string
} & User

const SignUp: React.FC = () => {
  const { control, getValues, handleSubmit } = useForm<Partial<UserSignup>>()

  const createUser = createUserMutation({ mutationKey: 'sign-up-form' })

  const onSubmit: SubmitHandler<Partial<UserSignup>> = async data => {
    try {
      await createUser
        .mutateAsync({
          data,
        })
        .then(() => {
          window.location.assign(`${APP_ROUTES.unauthenticated.signupSuccess}`)
        })
    } catch (e) {
      const error = e as GenericStatusErrorType
      if (canLoop(error?.data?.errors)) {
        error.data.errors.forEach(({ message }: { message: string }) =>
          toast.error(message, { autoClose: false, toastId: 'sign-up-errors' }),
        )
      } else {
        toast.error(
          `There was an error creating your account, please try again. Also ${JSON.stringify(e)} ${
            error.status
          } ${error.message}`,
          { autoClose: false, toastId: 'sign-up-error' },
        )
      }
    }
  }

  return (
    <Layout
      bottomContent={
        <Stack spacing={APP_SPACING.spacing}>
          <Heading size={APP_FORM_HEADINGS.size}>Sign Up for DIVA Score</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={APP_SPACING.spacing}>
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
            </Stack>
          </form>
        </Stack>
      }
    />
  )
}

export default SignUp
