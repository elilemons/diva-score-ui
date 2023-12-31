import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { FieldType } from '../types'
import type { SharedProps } from './types'

import { Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { APP_INPUT_COLORING } from '@root/utils/appStyling'

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
    isInvalid,
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
    <FormControl className={className} isRequired={required} isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Flex data-inline-label={inputSuffix}>
        <Input
          {...APP_INPUT_COLORING}
          data-cy={name}
          ref={inputRef}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type='text'
          id={name}
          title={label}
          disabled={disabled}
        />
      </Flex>
      <FormErrorMessage data-cy={`${name}-error`}>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}
