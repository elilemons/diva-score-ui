import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { ErrorMessage } from '@components/forms/ErrorMessage'
import { Label } from '@components/forms/Label'
import { FieldType } from '../types'

export type RetypeProps = {
  matchFieldType?: 'text' | 'password'
}
type UncontrolledRetypeProps = RetypeProps &
  FieldType & {
    inputRef?: RefCallBack
    value: string
  }
export const UncontrolledTextInput: React.FC<UncontrolledRetypeProps> = props => {
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
    placeholder,
    matchFieldType = 'text',
  } = props

  const [inputType, setInputType] = React.useState<'password' | 'text'>(matchFieldType)

  const toggleInputType = React.useCallback(() => {
    if (inputType === 'password') setInputType('text')
    else setInputType('password')
  }, [inputType])

  return (
    <div className={className}>
      <Label htmlFor={name} label={label} required={required} />
      <div>
        <input
          ref={inputRef}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={inputType}
          id={name}
          title={label}
          disabled={disabled}
          data-has-error={invalid}
          data-has-no-value={!value}
        />
        {matchFieldType === 'password' && !disabled && (
          <button type='button' onClick={toggleInputType}>
            {`${inputType === 'password' ? 'show' : 'hide'}`}
          </button>
        )}
      </div>
      <ErrorMessage showError={invalid} message={errorMessage} />
    </div>
  )
}
