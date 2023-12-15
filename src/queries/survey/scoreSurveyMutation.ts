import { Survey } from '@elilemons/diva-score-lib'
import { post } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { getSurveyByIdQueryKey } from '@root/queries/survey/getSurveyByIdQuery'
import { GenericStatusError, GenericStatusErrorType } from '@root/types/errors'
import { isResJSON } from '@root/utils/isResJSON'
import { UseMutationResult, useMutation, useQueryClient } from 'react-query'

type ScoreSurveyMutationProps = {
  survey: Survey
}

export function scoreSurveyMutation({
  mutationKey,
}: {
  mutationKey: string
}): UseMutationResult<
  { doc: Partial<Survey>; message: string },
  unknown,
  ScoreSurveyMutationProps
> {
  const queryClient = useQueryClient()
  const { apiDomain } = useAppConfig()

  const mutation = useMutation({
    mutationFn: async (survey: ScoreSurveyMutationProps) => {
      const res = await post(`${apiDomain}/api/surveys/score-survey`, {
        body: JSON.stringify(survey),
      })

      if (isResJSON(res)) {
        if (res.status === 200) {
          const json = await res.json()
          return json
        }

        if (res.status === 401) {
          throw GenericStatusError({
            status: 401,
            message: 'There was an error scoring the survey.',
          })
        }
      }

      throw GenericStatusError({
        status: 501,
        message: 'An unknown error occurred when attempting to score this survey',
      })
    },
    onError: (error: GenericStatusErrorType) => {
      throw GenericStatusError(error)
    },
    onSuccess: ({ res }) => {
      console.log('ELITEST survey scored mutation', { res })
      queryClient.invalidateQueries([getSurveyByIdQueryKey, res.doc.id])
      queryClient.setQueryData([getSurveyByIdQueryKey, res.doc.id], res)
    },
    mutationKey: [mutationKey],
  })

  return mutation
}
