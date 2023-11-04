/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Control, UseFormGetValues, Validate } from 'react-hook-form'

export type FieldType = {
  name: string
  label?: string
  required?: boolean
  className?: string
  placeholder?: string
  disabled?: boolean
  defaultValue?: string
  value?: unknown
  onChange: (value: any) => void
  invalid?: boolean
  errorMessage?: string
}

export type ControllerType = Omit<FieldType, 'onChange'> & {
  control: Control<any>
  getValues?: UseFormGetValues<any>
  validate?: Validate<any, any>
}
