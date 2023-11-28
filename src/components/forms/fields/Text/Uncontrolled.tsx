import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { FieldType } from '../types'
import type { SharedProps } from './types'

import { Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'

type UncontrolledProps = FieldType &
  SharedProps & {
    inputRef?: RefCallBack
    value: string
  }
export const UncontrolledTextInput: React.FC<UncontrolledProps> = props => {
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
    inputSuffix,
  } = props

  return (
    <FormControl className={className} isRequired={required}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Flex data-inline-label={inputSuffix}>
        <Input
          data-cy={name}
          ref={inputRef}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type='text'
          id={name}
          title={label}
          disabled={disabled}
          data-has-error={invalid}
          data-has-no-value={!value}
        />
      </Flex>
      {invalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}
