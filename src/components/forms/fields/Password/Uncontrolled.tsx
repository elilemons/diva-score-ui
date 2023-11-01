import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { ErrorMessage } from '@components/forms/ErrorMessage'
import { Label } from '@components/forms/Label'
import { FieldType } from '../types'

type UncontrolledProps = FieldType & {
  inputRef?: RefCallBack
  value: string
}
export const UncontrolledPasswordInput: React.FC<UncontrolledProps> = props => {
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
    required = true,
    placeholder = '* * * * * * * * *',
  } = props

  const [inputType, setInputType] = React.useState<'password' | 'text'>('password')

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
          placeholder={inputType === 'password' ? placeholder : ''}
          type={inputType}
          id={name}
          title={label}
          disabled={disabled}
          data-has-error={invalid}
          data-has-no-value={!value}
        />
        {!disabled && (
          <button type='button' onClick={toggleInputType}>
            {`${inputType === 'password' ? 'show' : 'hide'}`}
          </button>
        )}
      </div>
      <ErrorMessage showError={invalid} message={errorMessage} />
    </div>
  )
}
