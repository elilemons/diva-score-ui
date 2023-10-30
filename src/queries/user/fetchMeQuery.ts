import { User } from '@elilemons/diva-score-lib'
import { get } from '@root/api'
import { UseQueryResult, useQuery } from 'react-query'
import { GenericStatusError } from '@root/types/errors'

import { secureStorage } from '@utils/storage'

export const fetchMeQueryKey = 'fetch-me'
type fetchMeQueryProps = {
  depth?: number
  refetchInterval?: number
}
export function fetchMeQuery({
  refetchInterval,
}: fetchMeQueryProps): UseQueryResult<User | null, unknown> {
  const queryRes = useQuery({
    queryKey: [fetchMeQueryKey],
    queryFn: async () => {
      const token = await secureStorage.getJWTToken()
      if (token) {
        const apiDomain = process.env.REACT_APP_API_URL

        const res = await get(`${apiDomain}/api/users/me?depth=0`)
        if (res.status === 200) {
          const json = await res.json()
          return json.user
        }
      }
      return null
    },
    refetchInterval,
    onError: () => {
      throw GenericStatusError({
        status: 501,
        message: `An unknown error has occurred fetching the current user's information.`,
      })
    },
  })

  return queryRes
}
