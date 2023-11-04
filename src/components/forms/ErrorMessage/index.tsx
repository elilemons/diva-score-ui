import React from 'react'

type ErrorMessageProps = {
  showError?: boolean
  message?: string
  className?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = props => {
  const { showError = false, message = 'Please complete this field.', className } = props

  return (
    <p className={className} data-show-error={Boolean(showError && message)}>
      {message}
    </p>
  )
}
