import * as React from 'react'
import { Controller } from 'react-hook-form'

import { defaultValidate } from '@components/forms/validations'
import { ControllerType } from '../types'
import { RetypeProps, UncontrolledTextInput } from './Uncontrolled'

type ControlledRetypeProps = RetypeProps &
  Omit<ControllerType, 'validate'> & {
    matchFieldName: string
    getValues: (payload?: string | string[]) => object
  }
export const ControlledRetypeInput: React.FC<ControlledRetypeProps> = props => {
  const {
    name,
    defaultValue = '',
    control,
    required,
    label,
    matchFieldName,
    getValues,
    ...rest
  } = props

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        validate: {
          requireValue: val => (required ? defaultValidate(val) : true),
          matchesField: val => {
            if (val) {
              const { [matchFieldName]: fieldValueToMatch } = getValues()
              return fieldValueToMatch === val || 'Passwords should match!'
            }
            return true
          },
        },
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <UncontrolledTextInput
          {...rest}
          required={required}
          name={name}
          label={label}
          onChange={onChange}
          value={value}
          inputRef={ref}
          errorMessage={error?.message}
          invalid={Boolean(error)}
        />
      )}
    />
  )
}
