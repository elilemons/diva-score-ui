import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { FieldType } from '../types'
import type { SharedProps } from './types'

import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { APP_INPUT_COLORING } from '@root/utils/appStyling'

type UncontrolledProps = FieldType &
  SharedProps & {
    inputRef?: RefCallBack
    hint?: string | null | undefined
    value: string
  }
export const UncontrolledTextInput: React.FC<UncontrolledProps> = props => {
  const {
    name,
    className,
    hint,
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
      <FormHelperText data-cy={`${name}-hint`}>{hint}</FormHelperText>
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
