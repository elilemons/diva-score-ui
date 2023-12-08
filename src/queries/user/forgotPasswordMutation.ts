import { useMutation } from 'react-query'

import { post } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { GenericStatusError } from '@root/types/errors'
import { isResJSON } from '@utils/isResJSON'

type ForgotPasswordMutationProps = {
  email: string
}

export function forgotPasswordMutation() {
  const { apiDomain } = useAppConfig()

  const mutation = useMutation({
    mutationFn: async ({ email }: ForgotPasswordMutationProps) => {
      const res = await post(`${apiDomain}/api/users/forgot-password`, {
        body: JSON.stringify({ email }),
      })

      if (isResJSON(res)) {
        if (res.status === 200) {
          return res.json()
        }

        if (res.status === 401) {
          throw GenericStatusError({
            status: 401,
            message: 'There was a problem logging in with the credentials you provided.',
          })
        }
      }
      throw GenericStatusError({
        status: 501,
        message: 'An unknown error occurred when attempting to reset your password',
      })
    },
  })

  return mutation
}
