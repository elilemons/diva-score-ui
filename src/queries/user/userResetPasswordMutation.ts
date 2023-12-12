import { User } from '@elilemons/diva-score-lib'
import { useMutation, UseMutationResult } from 'react-query'

import { post } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { GenericStatusError } from '@root/types/errors'
import { isResJSON } from '@utils/isResJSON'
import { secureStorage } from '@utils/storage'

type UserResetPasswordMutationProps = {
  password: string
  token: string
}

export function userResetPasswordMutation(): UseMutationResult<
  Partial<User>,
  unknown,
  UserResetPasswordMutationProps
> {
  const { apiDomain } = useAppConfig()

  const mutation = useMutation({
    mutationFn: async ({ password, token }: UserResetPasswordMutationProps) => {
      const res = await post(`${apiDomain}/api/users/reset-password`, {
        body: JSON.stringify({
          password,
          token,
        }),
      })

      if (isResJSON(res)) {
        if (res.ok) {
          const json = await res.json()

          if (json && json.doc) {
            await secureStorage.setJWTToken(json.doc.token)
          } else {
            await secureStorage.setJWTToken(json.token)
          }
          return json.user
        }

        if (res.status === 401) {
          throw GenericStatusError({
            status: 401,
            message: 'There was an issue resetting your password.',
          })
        }
      }

      throw GenericStatusError({
        status: 501,
        message: 'An unknown error occurred when attempting to reset your password.',
      })
    },
  })

  return mutation
}
