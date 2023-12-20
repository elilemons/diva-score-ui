import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { FieldType } from '../types'

import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react'
import { APP_INPUT_COLORING } from '@root/utils/appStyling'

type UncontrolledProps = FieldType & {
  inputRef?: RefCallBack
  value: string
}
export const UncontrolledTextAreaInput: React.FC<UncontrolledProps> = props => {
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
    placeholder,
  } = props

  return (
    <FormControl className={className} isRequired={required} isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        {...APP_INPUT_COLORING}
        data-cy={name}
        ref={inputRef}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        id={name}
        title={label}
        disabled={disabled}
      />
      <FormErrorMessage data-cy={`${name}-error`}>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}
