import { DocWithToken, User } from '@elilemons/diva-score-lib'
import { UseMutationResult, useQueryClient, useMutation } from 'react-query'
import { post } from '../../api'
import { GenericStatusError } from '../../types/errors'
import { isResJSON } from '../../utils/isResJSON'
import { secureStorage } from '../../utils/storage'
import { fetchMeQueryKey } from './fetchMeQuery'

type MutateUserLoginProps = {
  data: {
    email: string
    password: string
  }
}
export function useUserLoginMutation(): UseMutationResult<
  DocWithToken<User>,
  unknown,
  MutateUserLoginProps
> {
  const queryClient = useQueryClient()
  const apiDomain = process.env.REACT_APP_API_URL

  const mutation = useMutation({
    mutationFn: async ({ data }: MutateUserLoginProps) => {
      const res = await post(`${apiDomain}/api/users/login?depth=0`, {
        body: JSON.stringify(data),
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
        message: 'An unknown error occurred when attempting to log you in',
      })
    },
    onSuccess: async data => {
      await secureStorage.setJWTToken(data.token)
      queryClient.invalidateQueries([fetchMeQueryKey])
      queryClient.setQueryData([fetchMeQueryKey], { ...data.user })
    },
  })

  return mutation
}
