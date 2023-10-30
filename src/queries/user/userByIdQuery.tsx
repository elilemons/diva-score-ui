import { User } from '@elilemons/diva-score-lib'
import { useQuery, UseQueryResult } from 'react-query'

import { get } from '@root/api'
import { GenericStatusError } from '@root/types/errors'
import { canLoop } from '@utils/canLoop'
import { isResJSON } from '@utils/isResJSON'

const userByIdQueryKey = 'get-user-by-id'
type userByIdQueryProps = {
  userId?: string
}
export function getUserByIdQuery({
  userId,
}: userByIdQueryProps): UseQueryResult<User | null, unknown> {
  const apiDomain = process.env.REACT_APP_API_URL
  const queryRes = useQuery({
    queryKey: [userByIdQueryKey, userId, apiDomain],
    queryFn: async () => {
      const res = await get(`${apiDomain}/api/users/${userId}`)

      if (isResJSON(res)) {
        const json = await res.json()
        if (res.status === 200) {
          return json
        }
        if (res.status === 400) {
          if (canLoop(json.errors)) {
            throw GenericStatusError({
              status: 400,
              message: 'There was an issue getting this user.',
              data: { ...json },
            })
          }
        }

        throw GenericStatusError({
          status: 501,
          message: 'An unknown error occurred when attempting to fetch this user',
        })
      }

      return null
    },
    onError: () => {
      throw GenericStatusError({ status: 501, message: 'An unknown error has occurred' })
    },
    enabled: !!userId,
  })

  return queryRes
}
