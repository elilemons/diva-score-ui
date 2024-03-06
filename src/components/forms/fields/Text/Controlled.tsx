import * as React from 'react'
import { Controller } from 'react-hook-form'

import { defaultValidate } from '@components/forms/validations'
import { ControllerType } from '../types'
import { UncontrolledTextInput } from './Uncontrolled'
import { SharedProps } from './types'

export const ControlledTextInput: React.FC<ControllerType & SharedProps> = props => {
  const { name, defaultValue = '', hint = '', control, required, label, validate, ...rest } = props

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        validate: {
          requireValue: val => (required ? defaultValidate(val) : true),
          customValidation: val => (val && validate ? validate(val, defaultValue) : true),
        },
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <UncontrolledTextInput
          {...rest}
          hint={hint}
          required={required}
          name={name}
          label={label}
          onChange={onChange}
          value={value}
          inputRef={ref}
          errorMessage={error?.message}
          isInvalid={Boolean(error)}
        />
      )}
    />
  )
}
