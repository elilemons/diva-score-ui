import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input } from '@chakra-ui/react'
import { APP_INPUT_COLORING } from '@root/utils/appStyling'
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
    isInvalid,
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
    <FormControl className={className} isRequired={required} isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Flex>
        <Input
          data-cy={name}
          {...APP_INPUT_COLORING}
          ref={inputRef}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={inputType}
          id={name}
          title={label}
          disabled={disabled}
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
      <FormErrorMessage data-cy={`${name}-error`}>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}
