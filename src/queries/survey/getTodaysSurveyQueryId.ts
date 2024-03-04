import { get } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { GenericStatusErrorType } from '@root/types/errors'
import { useQuery, UseQueryResult } from 'react-query'

/**
 * Returns the ID of any survey the user has already created today
 */
export const getTodaysSurveyKey = 'get-todays-survey'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTodaysSurveyIdQuery(): UseQueryResult<{ id: string | undefined }, unknown> {
  const { apiDomain } = useAppConfig()
  const queryRes = useQuery({
    queryKey: [getTodaysSurveyKey, apiDomain],
    queryFn: async () => {
      const url = `${apiDomain}/api/surveys/get-todays-survey`
      const res = await get(url)

      const json = res.json()
      return json
    },
    retry: (failCount, error: GenericStatusErrorType) => {
      console.error({ error })
      return failCount < 3
    },
  })

  return queryRes
}
