import { createStandaloneToast } from '@chakra-ui/react'
import { theme } from '@root/theme'
import { GenericStatusErrorType } from '@root/types/errors'
import { canLoop } from '@utils/canLoop'

const { toast } = createStandaloneToast({ theme })

type ToastErrorProps = {
  error: GenericStatusErrorType
  id: string
  title?: string
  description?: string
}
export const toastErrors = ({ error, id, title, description }: ToastErrorProps) => {
  if (canLoop(error?.data?.errors)) {
    error.data.errors.forEach(({ message, index }: { message: string; index: number }) => {
      if (!toast.isActive(`id-${index}`)) {
        toast({
          title: `${title ? `${title} ` : ''}Message #${index}`,
          description: `${description ? `${description} ` : ''}${message}`,
          id: `id-${index}`,
          status: 'error',
          isClosable: true,
          duration: null,
        })
      }
    })
  } else {
    if (!toast.isActive(id)) {
      toast({
        title,
        description: `${description ? `${description} ` : ''}Error: ${error.message}`,
        id,
        status: 'error',
        isClosable: true,
        duration: null,
      })
    }
  }
}
