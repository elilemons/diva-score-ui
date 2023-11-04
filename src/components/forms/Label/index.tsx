import React from 'react'

export type Props = {
  label: string | undefined
  required?: boolean
  htmlFor: string
  appearance?: 'default' | 'dimmed'
  className?: string
}

export const Label: React.FC<Props> = props => {
  const {
    htmlFor,
    required,
    label,
    //appearance = 'default',
    className,
  } = props

  if (label) {
    const splitLabel = label.split(' ')
    const lastWord = splitLabel.pop()
    const otherWords = splitLabel.join(' ')
    return (
      <label htmlFor={htmlFor} className={className}>
        <b>
          {otherWords && `${otherWords} `}
          {required ? (
            <span style={{ whiteSpace: 'nowrap' }}>
              {lastWord}
              {/* <span className={classes.requiredAsterisk}>*</span> */}
              <span>*</span>
            </span>
          ) : (
            lastWord
          )}
        </b>
      </label>
    )
  }

  return null
}
