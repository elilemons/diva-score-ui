import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input } from '@chakra-ui/react'
import { APP_INPUT_COLORING } from '@root/utils/appStyling'
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
    isInvalid,
    errorMessage,
    value = '',
    disabled,
    onChange,
    inputRef,
    required = true,
    placeholder = '* * * * * * * * ',
  } = props

  const [inputType, setInputType] = React.useState<'password' | 'text'>('password')

  const toggleInputType = React.useCallback(() => {
    if (inputType === 'password') setInputType('text')
    else setInputType('password')
  }, [inputType])

  return (
    <FormControl className={className} isRequired={required} isInvalid={isInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Flex>
        <Input
          {...APP_INPUT_COLORING}
          data-cy={name}
          ref={inputRef}
          onChange={onChange}
          value={value}
          placeholder={inputType === 'password' ? placeholder : ''}
          type={inputType}
          id={name}
          title={label}
          disabled={disabled}
          borderEnd='none'
          borderEndRadius='none'
        />
        {!disabled && (
          <IconButton
            aria-label={
              inputType === 'password' ? 'Click to show password' : 'Click to hide password'
            }
            data-cy={`${name}-toggle`}
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
