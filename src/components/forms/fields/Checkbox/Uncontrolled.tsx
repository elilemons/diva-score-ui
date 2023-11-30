import type { ThemingProps } from '@chakra-ui/react'
import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { FieldType } from '../types'

import { Checkbox, FormControl, FormErrorMessage, Text } from '@chakra-ui/react'

export type FieldSpecificProps = {
  defaultValue?: boolean
  secondaryLabel?: string
  subText?: React.ReactNode
  checkboxAlignment?: 'top' | 'center'
} & Pick<ThemingProps<'checkbox'>, 'size'>

type UncontrolledProps = FieldSpecificProps &
  Omit<FieldType, 'required' | 'defaultValue'> & {
    inputRef?: RefCallBack
    value: boolean
  }
export const UncontrolledCheckbox: React.FC<UncontrolledProps> = props => {
  const {
    name,
    className,
    label,
    secondaryLabel,
    subText,
    invalid,
    errorMessage,
    value = false,
    size,
  } = props

  return (
    <FormControl className={className}>
      <Checkbox checked={value} data-cy={name} id={name} size={size}>
        {label}
      </Checkbox>
      {subText && <Text size='xs'>{subText}</Text>}
      {secondaryLabel && <Text>{secondaryLabel}</Text>}

      {invalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}
