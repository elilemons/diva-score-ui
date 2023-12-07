import { User } from '@elilemons/diva-score-lib'
import { get } from '@root/api'
import { GenericStatusErrorType } from '@root/types/errors'
import { useQuery, UseQueryResult } from 'react-query'

import { useAppConfig } from '@root/components/appProviders/AppConfig'
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
    queryKey: [fetchMeQueryKey, refetchInterval],
    queryFn: async () => {
      const token = await secureStorage.getJWTToken()
      if (token) {
        const { apiDomain } = useAppConfig()

        const res = await get(`${apiDomain}/api/users/me?depth=0`)
        if (res.status === 200) {
          const json = await res.json()
          return json.user
        }
      }
      return null
      // TODO Handle if server is not up
      // throw GenericStatusError({
      //   status: 501,
      //   message: `An unknown error has occurred fetching the current user's information.`,
      // })
    },
    refetchInterval,
    retry: (failCount, error: GenericStatusErrorType) => {
      console.error({ error })
      return failCount < 3
    },
  })

  return queryRes
}
