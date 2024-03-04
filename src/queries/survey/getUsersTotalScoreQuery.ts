import { get } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { GenericStatusErrorType } from '@root/types/errors'
import { UseQueryResult, useQuery } from 'react-query'

export const getUsersTotalScoreKey = 'get-users-total-score'

export function getUsersTotalScoreQuery(): UseQueryResult<{ totalScore: number }, unknown> {
  const { apiDomain } = useAppConfig()
  const queryRes = useQuery({
    queryKey: [getUsersTotalScoreKey, apiDomain],
    queryFn: async () => {
      const url = `${apiDomain}/api/surveys/get-users-total-score`

      const res = await get(url)

      const json = await res.json()
      return json
    },
    retry: (failCount, error: GenericStatusErrorType) => {
      console.error({ error })
      return failCount < 3
    },
  })

  return queryRes
}
