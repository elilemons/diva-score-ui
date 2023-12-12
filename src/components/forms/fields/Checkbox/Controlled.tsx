import * as React from 'react'
import { Controller } from 'react-hook-form'

import { defaultValidate } from '@components/forms/validations'
import { ControllerType } from '../types'
import { FieldSpecificProps, UncontrolledCheckbox } from './Uncontrolled'

export const ControlledCheckbox: React.FC<
  Omit<ControllerType, 'defaultValue'> & FieldSpecificProps
> = props => {
  const { name, defaultValue = false, control, required, label, size, ...rest } = props

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        validate: {
          requireValue: val => (required ? defaultValidate(val) : true),
        },
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <UncontrolledCheckbox
          {...rest}
          defaultValue={defaultValue}
          name={name}
          onChange={onChange}
          value={value}
          inputRef={ref}
          errorMessage={error?.message}
          invalid={Boolean(error)}
          label={label}
          size={size}
        />
      )}
    />
  )
}
