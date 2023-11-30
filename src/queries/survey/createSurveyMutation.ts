import { Survey } from '@elilemons/diva-score-lib'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

import { post } from '@root/api'
import { GenericStatusError, GenericStatusErrorType } from '@root/types/errors'
import { isResJSON } from '@utils/isResJSON'
import { getSurveyByIdQueryKey } from './getSurveyByIdQuery'

type createSurveyMutationProps = {
  title: string
  surveyUser: string
  surveyDate: Date
}

export function createSurveyMutation({
  mutationKey,
}: {
  mutationKey: string
}): UseMutationResult<
  { doc: Partial<Survey>; message: string },
  unknown,
  createSurveyMutationProps
> {
  const queryClient = useQueryClient()
  const apiDomain = process.env.REACT_APP_API_URL

  const mutation = useMutation({
    mutationFn: async ({ title, surveyUser, surveyDate }: createSurveyMutationProps) => {
      const res = await post(`${apiDomain}/api/surveys`, {
        body: JSON.stringify({ title, surveyUser, surveyDate }),
      })

      if (isResJSON(res)) {
        if (res.status === 201) {
          const json = await res.json()
          return json
        }

        if (res.status === 401) {
          throw GenericStatusError({
            status: 401,
            message: 'There was an error creating the survey.',
          })
        }
      }

      throw GenericStatusError({
        status: 501,
        message: 'An unknown error occurred when attempting to fetch this survey',
      })
    },
    onError: (error: GenericStatusErrorType) => {
      throw GenericStatusError(error)
    },
    onSuccess: ({ res }) => {
      // TODO Remove this test code
      console.log('ELITEST survey created mutation', { res })
      // ^ TODO Remove this test code
      queryClient.invalidateQueries([getSurveyByIdQueryKey])
      queryClient.setQueryData([getSurveyByIdQueryKey], res)
    },
    mutationKey: [mutationKey],
  })

  return mutation
}
