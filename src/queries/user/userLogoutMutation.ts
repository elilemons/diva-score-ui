import { UseMutationResult, useQueryClient, useMutation } from 'react-query'
import { post } from '@root/api'
import { GenericStatusError } from '@root/types/errors'
import { isResJSON } from '@root/utils/isResJSON'
import { secureStorage } from '@root/utils/storage'
import { fetchMeQueryKey } from './fetchMeQuery'

export function useUserLogoutMutation(): UseMutationResult<null, unknown, void> {
  const queryClient = useQueryClient()
  const apiDomain = process.env.REACT_APP_API_URL

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await post(`${apiDomain}/api/users/logout`)

      if (isResJSON(res)) {
        if (res.status === 200) {
          return res.json()
        }
      }

      throw GenericStatusError({
        status: 501,
        message: 'An unknown error occurred when attempting to log you out',
      })
    },
    onMutate: async () => {
      await secureStorage.setJWTToken('')
      queryClient.invalidateQueries([fetchMeQueryKey])
      queryClient.setQueryData([fetchMeQueryKey], null)
    },
  })

  return mutation
}
