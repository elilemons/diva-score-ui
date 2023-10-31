import { APP_ROUTES } from '@root/appRoutes'
import { verifyUserEmailMutation } from '@root/queries/user/verifyUserEmailMutation'
import { GenericStatusErrorType } from '@root/types/errors'
import { canLoop } from '@utils/canLoop'
import * as React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string; userId: string }>()
  const verifyEmail = verifyUserEmailMutation({ mutationKey: 'verify-user-email' })
  const history = useHistory()

  const verify = React.useCallback(async () => {
    if (token) {
      try {
        await verifyEmail.mutateAsync({ token })
        toast.success('Your email was verified. You may now login.', { toastId: 'verify-success' })
        history.push(APP_ROUTES.unauthenticated.login)
      } catch (e) {
        const error = e as GenericStatusErrorType
        if (canLoop(error?.data?.errors)) {
          error.data.errors.forEach(({ message }: { message: string }) =>
            toast.error(message, { autoClose: false }),
          )
        } else {
          toast.error(
            `There was an error verifying your account, please try again. ${error.message} Have you already been verified? Try logging in.`,
            { toastId: 'verify-false', autoClose: false },
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
