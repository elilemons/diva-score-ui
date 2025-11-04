import { useAuth } from '@components/appProviders/Auth'
import { FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { Stack, useToast } from '@chakra-ui/react'
import { Layout } from '@components/elements/Layout'
import { ControlledEmailInput } from '@components/forms/fields/Email/Controlled'
import { Submit } from '@components/forms/Submit'
import { User } from '@elilemons/diva-score-lib'
import { ControlledTextInput } from '@root/components/forms/fields/Text/Controlled'
import { meMutation } from '@root/queries/user/meMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { APP_BRAND_BUTTON, APP_SPACING } from '@utils/appStyling'
import { toastErrors } from '@utils/toastErrors'
import { AccountLayout } from '../Layout'

const AccountEdit: FC = () => {
  const { user } = useAuth()
  const { control, handleSubmit } = useForm<Partial<User>>()

  const updateMe = meMutation({ mutationKey: 'account-page-update' })

  const toast = useToast()

  const onSubmit = useCallback(
    async (data: Partial<User>) => {
      try {
        if (!user) {
          return
        }

        await updateMe.mutateAsync({
          data,
        })

        const toastId = 'account-update-success'
        if (!toast.isActive(toastId)) {
          toast({
            id: toastId,
            description: 'Your account has been updated.',
            status: 'success',
          })
        }
      } catch (e) {
        const error = e as GenericStatusErrorType
        toastErrors({
          id: 'account-update-error',
          error,
          title: 'Account Update Error',
          description: 'There was an error updating your account, please try again.',
        })
      }
    },
    [user],
  )

  return (
    <Layout
      showBottomNav
      bottomContent={
        <AccountLayout heading='Edit Account Page' path='/edit'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={APP_SPACING.spacing}>
              <ControlledTextInput
                control={control}
                name='firstName'
                label='First Name'
                defaultValue={user?.firstName ?? ''}
              />
              <ControlledTextInput
                control={control}
                name='lastName'
                label='Last Name'
                defaultValue={user?.lastName ?? ''}
              />
              <ControlledEmailInput
                control={control}
                name='email'
                label='Email'
                defaultValue={user?.email}
              />
              <Submit label='Save' control={control} {...APP_BRAND_BUTTON} />
            </Stack>
          </form>
        </AccountLayout>
      }
    />
  )
}

export default AccountEdit
