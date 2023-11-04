import * as React from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'

// import { IconKeys, icons } from '@components/svgs/Icons'

type BrowserButtonTypes = 'button' | 'submit' | 'reset' | undefined
type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  classNames?: string
  type?: BrowserButtonTypes
  to?: never
}
type AnchorProps = React.HTMLProps<HTMLAnchorElement> & {
  classNames?: string
  to?: never
}
type ButtonContentsProps = {
  children: React.ReactNode
  // icon?: IconKeys
}

// const ButtonContents: React.FC<ButtonContentsProps> = ({ children, icon }) => {
const ButtonContents: React.FC<ButtonContentsProps> = ({ children }) => {
  // const Icon: React.FC | undefined = icon ? icons[icon] : undefined

  return (
    <React.Fragment>
      <span>{children}</span>
      {/* {Icon && (
        <span>
          <Icon />
        </span>
      )} */}
    </React.Fragment>
  )
}

type sharedProps = {
  variant?: 'primary' | 'secondary' | 'text' | 'unstyled'
  className?: string
  // icon?: IconKeys
  iconPlacement?: 'before' | 'after'
  disabled?: boolean
  underlineText?: boolean
  fullWidth?: boolean
  contentAlignment?: 'left' | 'center' | 'space-between'
  label?: string
  padding?: 'none' | 'slim' | 'normal'
}

export const Button: React.FC<(ButtonProps | AnchorProps | LinkProps) & sharedProps> = props => {
  const { pathname } = useLocation()
  const {
    children,
    variant = 'primary',
    className,
    // icon,
    // iconPlacement = 'after',
    disabled = false,
    // fullWidth,
    // underlineText,
    // contentAlignment = 'center',
    label,
    // padding = 'normal',
    ...rest
  } = props

  const isLink = 'to' in rest && rest?.to
  const isAnchor = 'href' in rest

  // let renderAs = 'button'
  // if ('to' in rest) renderAs = 'routeLink'
  // else if (isAnchor) renderAs = 'anchor'

  // const classNames = joinClassNames([
  //   className || undefined,
  //   classes.button,
  //   classes[`asElement--${renderAs}`],
  //   classes[`variant--${variant}`],
  //   classes[`contentAlignment--${contentAlignment}`],
  //   disabled ? classes.isDisabled : undefined,
  //   icon ? classes.hasIcon : undefined,
  //   icon ? classes[`iconPlacement--${iconPlacement}`] : undefined,
  //   fullWidth ? classes.fullWidth : undefined,
  //   underlineText ? classes.textUnderline : undefined,
  //   classes[`padding--${padding}`],
  // ])

  if (isLink && rest?.to) {
    const { to, ...reactRouterLinkProps } = rest
    return (
      <Link
        {...reactRouterLinkProps}
        replace={disabled}
        to={disabled ? pathname : to}
        className={className}
      >
        {variant === 'unstyled' ? (
          children
        ) : (
          // <ButtonContents icon={icon}>{children || label}</ButtonContents>
          <ButtonContents>{children || label}</ButtonContents>
        )}
      </Link>
    )
  }

  if (isAnchor) {
    return (
      <a {...(rest as AnchorProps)} className={className}>
        {variant === 'unstyled' ? (
          children
        ) : (
          // <ButtonContents icon={icon}>{children || label}</ButtonContents>
          <ButtonContents>{children || label}</ButtonContents>
        )}
      </a>
    )
  }

  const { type, ...buttonProps } = rest as ButtonProps
  return (
    <button
      {...(buttonProps as ButtonProps)}
      disabled={disabled}
      type={type || 'button'}
      className={className}
    >
      {variant === 'unstyled' ? (
        children
      ) : (
        // <ButtonContents icon={icon}>{children || label}</ButtonContents>
        <ButtonContents>{children || label}</ButtonContents>
      )}
    </button>
  )
}
