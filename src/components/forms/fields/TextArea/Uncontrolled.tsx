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
    invalid,
    errorMessage,
    value = '',
    disabled,
    onChange,
    inputRef,
    required,
    placeholder,
  } = props

  return (
    <FormControl className={className} isRequired={required}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        {...APP_INPUT_COLORING}
        ref={inputRef}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        id={name}
        title={label}
        disabled={disabled}
        data-has-error={invalid}
        data-has-no-value={!value}
      />
      {invalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}
