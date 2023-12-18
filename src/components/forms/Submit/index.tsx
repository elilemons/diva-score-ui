import { Button } from '@chakra-ui/react'
import React from 'react'
import { Control, useFormState } from 'react-hook-form'

export type Props = {
  label?: string
  id?: string
  disabled?: boolean
  valuesMustChange?: boolean
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, any>
  colorScheme?: string
  removeTopMargin?: boolean
  submittingLabel?: string
  bgGradient?: string
}

export const Submit: React.FC<Props> = props => {
  const {
    label = 'Submit',
    id,
    disabled = false,
    valuesMustChange = false,
    className,
    control,
    // removeTopMargin,
    submittingLabel = 'Submitting...',
    colorScheme,
    bgGradient,
  } = props

  const { isDirty, isSubmitting } = useFormState({ control })

  let isDisabled = valuesMustChange ? !isDirty : disabled
  if (isSubmitting) isDisabled = true

  return (
    <Button
      data-cy='submit'
      type='submit'
      id={id}
      disabled={isDisabled}
      className={className}
      colorScheme={colorScheme}
      bgGradient={bgGradient}
    >
      {isSubmitting ? submittingLabel : label}
    </Button>
  )
}
