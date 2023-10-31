import { APP_ROUTES } from '@root/appRoutes'
import { verifyUserEmailMutation } from '@root/queries/user/verifyUserEmailMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { canLoop } from '@utils/canLoop'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>()
  const verifyEmail = verifyUserEmailMutation({ mutationKey: 'verify-user-email' })

  const verify = React.useCallback(async () => {
    if (token) {
      try {
        await verifyEmail.mutateAsync({ token })

        toast.success('Your account has been verified! You can now login.')
      } catch (e) {
        const error = e as GenericStatusErrorType
        if (canLoop(error?.data?.errors)) {
          error.data.errors.forEach(({ message }: { message: string }) =>
            toast.error(message, { autoClose: false }),
          )
        } else {
          toast.error(
            `There was an error creating your account, please try again. Also ${error.message}`,
            { autoClose: false },
          )
        }
      }
    } else {
      toast.error('Token is invalid.')
    }
  }, [])

  React.useEffect(() => {
    verify()
  }, [])
  return <Link to={APP_ROUTES.unauthenticated.login}>Login</Link>
}

export default VerifyEmail
