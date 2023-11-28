import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input } from '@chakra-ui/react'
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
    <FormControl className={className} isRequired={required}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Flex>
        <Input
          data-cy={name}
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
          <IconButton
            aria-label={
              inputType === 'password' ? 'Click to show password' : 'Click to hide password'
            }
            borderStartRadius='none'
            onClick={toggleInputType}
          >
            {inputType === 'password' ? <ViewIcon /> : <ViewOffIcon />}
          </IconButton>
        )}
      </Flex>
      {invalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}
