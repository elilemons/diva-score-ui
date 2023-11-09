import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input } from '@chakra-ui/react'
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
    <FormControl className={className} isRequired={required}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Flex>
        <Input
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
          borderEnd='none'
          borderEndRadius='none'
        />
        {!disabled && (
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
