import { Doc, User } from '@elilemons/diva-score-lib'

import { UseMutationResult, useQueryClient, useMutation } from 'react-query'
import { patch } from '@root/api'
import { GenericStatusError } from '@root/types/errors'
import { canLoop } from '@root/utils/canLoop'
import { isResJSON } from '@root/utils/isResJSON'
import { fetchMeQuery, fetchMeQueryKey } from './fetchMeQuery'

import QueryString from 'qs'

type MeMutationProps = {
  data: User
  depth?: number
  queryParams?: {
    [key: string]: unknown
  }
}
export function useMeMutation(): UseMutationResult<Doc<User>, unknown, MeMutationProps> {
  const queryClient = useQueryClient()
  const { data: user } = fetchMeQuery({})
  const apiDomain = process.env.REACT_APP_API_URL

  const mutation = useMutation({
    mutationFn: async ({ data, depth = 0, queryParams = {} }: MeMutationProps) => {
      const params = QueryString.stringify(
        {
          ...queryParams,
          depth: depth || queryParams?.depth || 0,
        },
        { addQueryPrefix: true },
      )

      if (user?.id) {
        const res = await patch(`${apiDomain}/api/users/${user?.id}${params}`, {
          body: JSON.stringify(data),
        })
        if (isResJSON(res)) {
          const json = await res.json()
          if (res.status === 200) {
            return json
          }
          if (res.status === 400) {
            if (canLoop(json.errors)) {
              throw GenericStatusError({
                status: 400,
                message: 'Validation errors occurred during the form submission',
                data: { ...json },
              })
            }
          }
        }

        throw GenericStatusError({
          status: 501,
          message: 'An unknown error occurred while updating the user.',
        })
      }

      throw GenericStatusError({
        status: 400,
        message: 'Could not find your users id.',
      })
    },
    onSuccess: data => {
      if (data?.doc) {
        queryClient.invalidateQueries([fetchMeQueryKey])
        queryClient.setQueryData([fetchMeQueryKey], data.doc)
      }
    },
  })

  return mutation
}
