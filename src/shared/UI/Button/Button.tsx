import { Icon } from '../Icon/Icon'
import type { Icon as IconType } from '../Icon/icons'
import './Button.css'

const buttonVariant = {
  primary: 'button--primary',
  secondary: 'button--secondary',
  danger: 'button--danger'
}

const buttonSize = {
  small: 'button--small',
  base: 'button--base',
  large: 'button--large',
  xl: 'button--xl',
}
export type ButtonProps = Readonly<{
  variant?: keyof typeof buttonVariant
  size?: keyof typeof buttonSize
  placeholder?: string,
  href?: string,
  icon?: IconType
  action?: () => void
}>

export function Button({ variant = 'primary', size = 'base', placeholder, href, action, icon }: ButtonProps) {
  if (href) {
    return <a className={`button ${buttonVariant[variant]} ${buttonSize[size]}`} href={href}>{placeholder && <span>{placeholder}</span>} {icon && <Icon name={icon} size={size} />}</a>
  } else {
    return <button className={`button ${buttonVariant[variant]} ${buttonSize[size]}`} onClick={action}>{placeholder && <span>{placeholder}</span>} {icon && <Icon name={icon} size={size} />}</button>

  }
}