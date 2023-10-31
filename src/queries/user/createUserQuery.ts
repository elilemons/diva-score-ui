import { DocWithToken, User } from '@elilemons/installmint-lib'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

import { post } from '@root/api'
import { GenericStatusError } from '@root/types/errors'
import { isResJSON } from '@utils/isResJSON'
import { secureStorage } from '@utils/storage'
import { fetchMeQueryKey } from './fetchMeQuery'

type MutateUserCreateProps = {
  data: Partial<User>
}

export function useUserCreateMutation(): UseMutationResult<
  { doc: DocWithToken<User> },
  unknown,
  MutateUserCreateProps
> {
  const queryClient = useQueryClient()
  const apiDomain = process.env.REACT_APP_API_URL

  const mutation = useMutation({
    mutationFn: async ({ data }: MutateUserCreateProps) => {
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
            message: 'There was a creating your account.',
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
  })

  return mutation
}
