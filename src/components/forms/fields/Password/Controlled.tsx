import * as React from 'react'
import { Controller } from 'react-hook-form'

import { defaultPasswordValidation, defaultValidate } from '@components/forms/validations'
import { ControllerType } from '../types'
import { UncontrolledPasswordInput } from './Uncontrolled'

export const ControlledPasswordInput: React.FC<ControllerType> = props => {
  const { name, defaultValue = '', control, required, label, validate, ...rest } = props

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        validate: {
          requireValue: val => (required ? defaultValidate(val) : true),
          customValidation: val => {
            if (val) {
              if (validate) {
                return validate(val, defaultValue)
              }
              return defaultPasswordValidation(val)
            }
            return true
          },
        },
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <UncontrolledPasswordInput
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
