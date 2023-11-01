import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { ErrorMessage } from '@components/forms/ErrorMessage'
import { Label } from '@components/forms/Label'
import { FieldType } from '../types'

type UncontrolledProps = FieldType & {
  inputRef?: RefCallBack
  value: string
}
export const UncontrolledEmailInput: React.FC<UncontrolledProps> = props => {
  const {
    name,
    className,
    label,
    invalid,
    errorMessage,
    value = '',
    disabled,
    onChange,
    inputRef,
    required,
    placeholder = 'you@domain.com',
  } = props

  return (
    <div className={className}>
      <Label htmlFor={name} label={label} required={required} />
      <input
        ref={inputRef}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type='email'
        id={name}
        title={label}
        disabled={disabled}
        data-has-error={invalid}
        data-has-no-value={!value}
      />
      <ErrorMessage showError={invalid} message={errorMessage} />
    </div>
  )
}
