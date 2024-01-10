import { Docs, Survey } from '@elilemons/diva-score-lib'
import { get } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { GenericStatusErrorType } from '@root/types/errors'
import { UseQueryResult, useQuery } from 'react-query'

export const getUsersSurveysKey = 'get-users-surveys'

type getUsersSurveysProps = {
  limit?: number
}
export function getUsersSurveysQuery({
  limit,
}: getUsersSurveysProps): UseQueryResult<Docs<Survey>, unknown> {
  const { apiDomain } = useAppConfig()
  const queryRes = useQuery({
    queryKey: [getUsersSurveysKey, apiDomain, limit],
    queryFn: async () => {
      let url = `${apiDomain}/api/surveys/get-users-surveys`

      if (limit) {
        url += `?limit=${limit}`
      }

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
