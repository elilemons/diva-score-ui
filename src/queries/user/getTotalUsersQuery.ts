import { get } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { GenericStatusError, GenericStatusErrorType } from '@root/types/errors'
import { UseQueryResult, useQuery } from 'react-query'

export const getTotalUsersQueryKey = 'get-total-users'
export function getTotalUsersQuery(): UseQueryResult<
  { totalUsers: number },
  GenericStatusErrorType
> {
  const { apiDomain } = useAppConfig()
  const queryRes = useQuery(
    [getTotalUsersQueryKey],
    async () => {
      const url = `${apiDomain}/api/users/get-total-users`
      const res = await get(url)
      if (res.status === 200) {
        const json = await res.json()
        return json
      }
      throw GenericStatusError({
        status: res.status,
        message: res.statusText || 'Unknown Error',
      })
    },
    {
      refetchOnMount: 'always',

      retry: (failCount, error: GenericStatusErrorType) => {
        console.error({ error })
        return failCount < 3
      },
    },
  )

  return queryRes
}
