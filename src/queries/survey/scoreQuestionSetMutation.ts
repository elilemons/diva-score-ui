import { QuestionSet } from '@elilemons/diva-score-lib' // Make sure you have a 'QuestionSet' type
import { post } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { GenericStatusError, GenericStatusErrorType } from '@root/types/errors'
import { isResJSON } from '@root/utils/isResJSON'
import { UseMutationResult, useMutation } from 'react-query'

type ScoreQuestionSetMutationProps = {
  questionSet: QuestionSet
}

export function scoreQuestionSetMutation({
  mutationKey,
}: {
  mutationKey: string
}): UseMutationResult<
  { doc: Partial<QuestionSet>; message: string },
  unknown,
  ScoreQuestionSetMutationProps
> {
  const { apiDomain } = useAppConfig()

  const mutation = useMutation({
    mutationFn: async ({ questionSet }: ScoreQuestionSetMutationProps) => {
      const res = await post(`${apiDomain}/api/question-sets/score-question-set`, {
        body: JSON.stringify(questionSet),
      })

      if (isResJSON(res)) {
        if (res.status === 200) {
          const json = await res.json()
          return json
        }

        if (res.status === 401) {
          throw GenericStatusError({
            status: 401,
            message: 'There was an error scoring the question set.',
          })
        }
      }

      throw GenericStatusError({
        status: 501,
        message: 'An unknown error occurred when attempting to score this question set',
      })
    },
    onError: (error: GenericStatusErrorType) => {
      throw GenericStatusError(error)
    },
    mutationKey: [mutationKey],
  })

  return mutation
}
