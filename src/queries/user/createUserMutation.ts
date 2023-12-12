import { DocWithToken, User } from '@elilemons/diva-score-lib'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

import { post } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { GenericStatusError } from '@root/types/errors'
import { isResJSON } from '@utils/isResJSON'
import { secureStorage } from '@utils/storage'
import { fetchMeQueryKey } from './fetchMeQuery'

type createUserMutationProps = {
  data: Partial<User>
}

export function createUserMutation({
  mutationKey,
}: {
  mutationKey: string
}): UseMutationResult<{ doc: DocWithToken<User> }, unknown, createUserMutationProps> {
  const queryClient = useQueryClient()
  const { apiDomain } = useAppConfig()

  const mutation = useMutation({
    mutationFn: async ({ data }: createUserMutationProps) => {
      const res = await post(`${apiDomain}/api/users?depth=0`, {
        body: JSON.stringify(data),
      })

      if (isResJSON(res)) {
        if (res.status === 201) {
          const json = await res.json()
          await secureStorage.setJWTToken(json.doc.token)
          return json
        }

        if (res.status === 401) {
          throw GenericStatusError({
            status: 401,
            message: 'There was an error creating your account.',
          })
        }
      }

      throw GenericStatusError({
        status: 501,
        message: 'An unknown error occurred when attempting to create your account',
      })
    },
    onSuccess: ({ doc }) => {
      queryClient.invalidateQueries([fetchMeQueryKey])
      queryClient.setQueryData([fetchMeQueryKey], doc)
    },
    mutationKey: [mutationKey],
  })

  return mutation
}
