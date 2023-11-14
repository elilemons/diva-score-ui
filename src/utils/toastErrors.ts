import { createStandaloneToast } from '@chakra-ui/react'
import { GenericStatusErrorType } from '@root/types/errors'
import { canLoop } from '@utils/canLoop'

const { toast } = createStandaloneToast()

export type ToastErrorProps = {
  error: GenericStatusErrorType
  id: string
}
export const toastErrors = ({ error, id }: ToastErrorProps) => {
  if (canLoop(error?.data?.errors)) {
    error.data.errors.forEach(({ message, index }: { message: string; index: number }) => {
      if (!toast.isActive(`id-${index}`)) {
        toast({
          title: `Verification Error Message #${index}`,
          description: `There was an error verifying your account, please try again. ${message} Have you already been verified? Try logging in.`,
          id: `id-${index}`,
          status: 'error',
          isClosable: false,
        })
      }
    })
  } else {
    if (!toast.isActive(id)) {
      toast({
        title: 'Verification Error',
        description: `There was an error verifying your account, please try again. ${error.message} Have you already been verified? Try logging in.`,
        id,
        status: 'error',

        isClosable: false,
      })
    }
  }
}
