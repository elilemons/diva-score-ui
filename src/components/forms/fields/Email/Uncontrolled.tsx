import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { APP_INPUT_COLORING } from '@root/utils/appStyling'
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
    isInvalid,
    errorMessage,
    value = '',
    disabled,
    onChange,
    inputRef,
    required,
    placeholder = 'you@domain.com',
  } = props

  return (
    <FormControl className={className} isRequired={required} isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        {...APP_INPUT_COLORING}
        data-cy={name}
        ref={inputRef}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type='email'
        id={name}
        title={label}
        disabled={disabled}
      />
      <FormErrorMessage data-cy={`${name}-error`}>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}
