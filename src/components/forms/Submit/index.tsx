import React from 'react'
import { Control, useFormState } from 'react-hook-form'

import { Button } from '@components/elements/Button'

export type Props = {
  label?: string
  id?: string
  disabled?: boolean
  valuesMustChange?: boolean
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, any>
  removeTopMargin?: boolean
  submittingLabel?: string
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
  } = props

  const { isDirty, isSubmitting } = useFormState({ control })

  let isDisabled = valuesMustChange ? !isDirty : disabled
  if (isSubmitting) isDisabled = true

  return (
    <Button type='submit' id={id} disabled={isDisabled} className={className}>
      {isSubmitting ? submittingLabel : label}
    </Button>
  )
}
