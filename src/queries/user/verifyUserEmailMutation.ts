import { useMutation, UseMutationResult } from 'react-query'

import { post } from '@root/api'
import { GenericStatusError } from '@root/types/errors'
import { isResJSON } from '@utils/isResJSON'

type VerifyUserEmailProps = {
  token: string
}
export function verifyUserEmailMutation({
  mutationKey,
}: {
  mutationKey: string
}): UseMutationResult<string, unknown, VerifyUserEmailProps> {
  const apiDomain = process.env.REACT_APP_API_URL

  const mutation = useMutation({
    mutationFn: async ({ token }: VerifyUserEmailProps) => {
      const url = `${apiDomain}/api/users/verify/${token}`
      const res = await post(url)

      if (isResJSON(res)) {
        const json = await res.json()

        if (res.status === 200) {
          return json
        }
        if (res.status === 403) {
          throw GenericStatusError({
            status: res.status,
            message: res.statusText,
          })
        }

        const apiError = json?.errors?.[0]
        if (apiError) {
          throw GenericStatusError({
            status: res.status || 400,
            message: apiError.message,
            data: apiError.data,
          })
        }
      }

      throw GenericStatusError({
        status: 501,
        message: 'An unknown error occurred while verifying the user.',
      })
    },
    mutationKey: [mutationKey],
  })

  return mutation
}
