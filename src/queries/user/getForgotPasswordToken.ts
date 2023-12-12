import { useQuery, UseQueryResult } from 'react-query'

import { get } from '@root/api'
import { useAppConfig } from '@root/components/appProviders/AppConfig'
import { GenericStatusError, GenericStatusErrorType } from '@root/types/errors'

export const getForgotPasswordTokenQueryKey = 'get-forgot-password-token'

type getForgotPasswordTokenProps = {
  run: boolean
}

export function getForgotPasswordTokenQuery({
  run,
}: getForgotPasswordTokenProps): UseQueryResult<{ token: string }, GenericStatusErrorType> {
  const { apiDomain } = useAppConfig()

  const queryRes = useQuery<{ token: string }, GenericStatusErrorType>({
    queryKey: [getForgotPasswordTokenQueryKey, apiDomain],
    queryFn: async () => {
      const url = `${apiDomain}/api/users/generate-forgot-password-token`
      const res = await get(url)
      if (res.status === 200) {
        const json = res.json()
        return json
      }

      throw GenericStatusError({
        status: res.status,
        message: res.statusText,
      })
    },
    enabled: !!run,
  })

  return queryRes
}
