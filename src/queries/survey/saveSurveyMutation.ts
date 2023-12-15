import { Survey } from '@elilemons/diva-score-lib'
import { patch } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { getSurveyByIdQueryKey } from '@root/queries/survey/getSurveyByIdQuery'
import { GenericStatusError, GenericStatusErrorType } from '@root/types/errors'
import { isResJSON } from '@root/utils/isResJSON'
import { UseMutationResult, useMutation, useQueryClient } from 'react-query'

type SaveSurveyMutationProps = {
  survey: Partial<Survey>
}

export function saveSurveyMutation({
  mutationKey,
}: {
  mutationKey: string
}): UseMutationResult<{ doc: Partial<Survey>; message: string }, unknown, SaveSurveyMutationProps> {
  const queryClient = useQueryClient()
  const { apiDomain } = useAppConfig()

  const mutation = useMutation({
    mutationFn: async ({ survey }: SaveSurveyMutationProps) => {
      const res = await patch(`${apiDomain}/api/surveys/${survey.id}`, {
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
            message: 'There was an error saving the survey.',
          })
        }
      }

      throw GenericStatusError({
        status: 501,
        message: 'An unknown error occurred when attempting to save this survey',
      })
    },
    onError: (error: GenericStatusErrorType) => {
      throw GenericStatusError(error)
    },
    onSuccess: ({ res }) => {
      console.log('ELITEST survey saved mutation', { res })
      queryClient.invalidateQueries([getSurveyByIdQueryKey, res.doc.id])
      queryClient.setQueryData([getSurveyByIdQueryKey, res.doc.id], res)
    },
    mutationKey: [mutationKey],
  })

  return mutation
}
