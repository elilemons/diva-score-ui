/* eslint-disable prefer-regex-literals */
import { isPast, isValid } from "date-fns"

export type Validate = (value: unknown) => boolean | string

// Regex's
const hasUppercaseRegex = new RegExp("(?=.*[A-Z])")
const hasSpecialCharacterRegex = new RegExp("(?=.*[-+_!@#$%^&*., ?])")
const isValidEmail = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
)
const visaPatternRegExp = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?)$/)
const mastPatternRegExp = new RegExp(/^(?:5[1-5][0-9]{14})$/)
const amexPatternRegExp = new RegExp(/^(?:3[47][0-9]{13})$/)
const discPatternRegExp = new RegExp(/^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/)

export function isNumeric(value: unknown): boolean {
  return /^-?[0-9]+$/.test(String(value))
}

export const defaultValidate: Validate = value => {
  if (value) {
    const stringValue = String(value)
    const hasValue = stringValue && stringValue.length > 0

    if (hasValue) {
      return true
    }
  }

  return "This field is required."
}

export const validateEmail: Validate = value => {
  if (value) {
    const stringValue = String(value)
    const isEmail = isValidEmail.test(stringValue)

    if (isEmail) {
      return true
    }
  }

  return "Please enter a valid email address."
}

export const validatePhone: Validate = value => {
  if (value) {
    const stringValue = String(value)
    const isPhone = stringValue.match(/\d/g)?.length === 10
    if (isPhone) {
      return true
    }
  }

  return "Please enter a valid 10 digit phone number, ex: 123 456 7890."
}

export const defaultPasswordValidation: Validate = (value: unknown) => {
  if (value) {
    const stringValue = String(value)
    if (typeof value === "string") {
      if (stringValue.length < 8) {
        return "Password must be 8 or more characters in length."
      }
      if (!hasUppercaseRegex.test(stringValue)) {
        return "An uppercase letter is required."
      }
      if (!hasSpecialCharacterRegex.test(stringValue)) {
        return "A special character is required."
      }
      return true
    }
  }

  return "Invalid password format."
}

export const creditCardValidation: Validate = (value: unknown) => {
  if (value) {
    const stringValue = String(value)
    const isVisa = visaPatternRegExp.test(stringValue) === true
    const isMast = mastPatternRegExp.test(stringValue) === true
    const isAmex = amexPatternRegExp.test(stringValue) === true
    const isDisc = discPatternRegExp.test(stringValue) === true

    if (isVisa || isMast || isAmex || isDisc) {
      return true
    }
  }

  return "Please enter a valid card number."
}

export const validateNumber: Validate = (value: unknown) => {
  if (value) {
    const stringValue = String(value)
    const onlyContainsNumbers = isNumeric(stringValue)
    if (onlyContainsNumbers) {
      return true
    }
  }

  return "This field only allows numbers."
}

export const validateZipcode: Validate = (value: unknown) => {
  if (value) {
    const stringValue = String(value)
    if (isNumeric(stringValue)) {
      if (stringValue.length === 5) {
        return true
      }

      return "Zipcode must be 5 characters."
    }
  }

  return "Zipcode should only contain numbers."
}

export const validateLicensePlate: Validate = (value: unknown) => {
  if (value) {
    const stringValue = String(value)
    if (stringValue.length <= 7) {
      return true
    }
  }

  return "License plate should be 7 characters or less."
}

export const validateIsFutureDateTime = (value: string): string | boolean => {
  const dateObject = new Date(value)
  if (!isValid(dateObject)) return "Please enter a valid date (yyyy-mm-dd)."
  if (isPast(dateObject)) return "Please enter a date in the future."

  return true
}
