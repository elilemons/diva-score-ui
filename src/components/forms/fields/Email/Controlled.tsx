import * as React from 'react'
import { Controller } from 'react-hook-form'

import { defaultValidate, validateEmail } from '@components/forms/validations'
import { ControllerType } from '../types'
import { UncontrolledEmailInput } from './Uncontrolled'

export const ControlledEmailInput: React.FC<ControllerType> = props => {
  const { name, defaultValue = '', control, required, label, validate, ...rest } = props

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        validate: {
          requireValue: val => (required ? defaultValidate(val) : true),
          customValidation: val => (val && validate ? validate(val, defaultValue) : true),
          validateEmail: val => {
            if (val) {
              return validateEmail(val)
            }
            return true
          },
        },
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <UncontrolledEmailInput
          {...rest}
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
