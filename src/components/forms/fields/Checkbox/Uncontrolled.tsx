import type { ThemingProps } from '@chakra-ui/react'
import * as React from 'react'
import { RefCallBack } from 'react-hook-form'

import { FieldType } from '../types'

import { Checkbox, FormControl, FormErrorMessage, Text } from '@chakra-ui/react'
import { APP_INPUT_COLORING } from '@root/utils/appStyling'

export type FieldSpecificProps = {
  defaultValue?: boolean
  secondaryLabel?: string
  subText?: React.ReactNode
  checkboxAlignment?: 'top' | 'center'
} & Partial<Pick<ThemingProps<'checkbox'>, 'size'>>

type UncontrolledProps = FieldSpecificProps &
  Omit<FieldType, 'required' | 'defaultValue'> & {
    inputRef?: RefCallBack
    value: boolean
  }
export const UncontrolledCheckbox: React.FC<UncontrolledProps> = props => {
  const {
    name,
    className,
    disabled,
    label,
    secondaryLabel,
    subText,
    isInvalid: invalid,
    errorMessage,
    value = false,
    size,
    onChange,
    inputRef,
  } = props

  return (
    <FormControl className={className} isInvalid={invalid}>
      <Checkbox
        {...APP_INPUT_COLORING}
        disabled={disabled}
        name={name}
        isChecked={value}
        data-cy={name}
        id={name}
        size={size}
        colorScheme={'brand'}
        onChange={onChange}
        ref={inputRef}
      >
        <Text fontWeight='medium'>{label}</Text>
      </Checkbox>
      {subText && <Text size='xs'>{subText}</Text>}
      {secondaryLabel && <Text>{secondaryLabel}</Text>}

      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}
