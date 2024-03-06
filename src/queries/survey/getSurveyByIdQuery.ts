import { Survey } from '@elilemons/diva-score-lib'
import { useQuery, UseQueryResult } from 'react-query'

import { get } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { GenericStatusError } from '@root/types/errors'
import { canLoop } from '@utils/canLoop'
import { isResJSON } from '@utils/isResJSON'

export const getSurveyByIdQueryKey = 'get-survey-by-id'
type surveyByIdQueryProps = {
  surveyId?: string
}
export function getSurveyByIdQuery({
  surveyId,
}: surveyByIdQueryProps): UseQueryResult<Survey | null, unknown> {
  const { apiDomain } = useAppConfig()
  const queryRes = useQuery({
    queryKey: [getSurveyByIdQueryKey, surveyId, apiDomain],
    queryFn: async () => {
      const res = await get(`${apiDomain}/api/surveys/${surveyId}`)

      if (isResJSON(res)) {
        const json = await res.json()
        if (res.status === 200) {
          return json
        }
        if (res.status === 400) {
          if (canLoop(json.errors)) {
            throw GenericStatusError({
              status: 400,
              message: 'There was an issue getting this survey.',
              data: { ...json },
            })
          }
        }

        throw GenericStatusError({
          status: 501,
          message: 'An unknown error occurred when attempting to fetch this survey',
        })
      }

      return null
    },
    refetchOnMount: 'always',
    onError: () => {
      throw GenericStatusError({ status: 501, message: 'An unknown error has occurred' })
    },
    enabled: !!surveyId,
  })

  return queryRes
}
