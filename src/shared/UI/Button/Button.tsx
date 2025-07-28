import type { Size } from '../../types/Types'
import './Button.css'

const buttonVariant = {
  primary: 'button-primary',
  secondary: 'button-secondary',
}

const buttonSize = {
  small: 'button-small',
  base: 'button-base',
  large: 'button-large',
  xl: 'button-xl',
}
export type ButtonProps = {
  variant?: keyof typeof buttonVariant
  size?: Size
  placeholder?: string,
  href?: string,
}

export function Button({ variant = 'primary', size = 'base', placeholder = 'Click me', href }: ButtonProps) {
  if (href) {
    return <a className={`button ${buttonVariant[variant]} ${buttonSize[size]}`}>{placeholder}</a>
  } else {
    return <>
    <button className={`button ${buttonVariant[variant]} ${buttonSize[size]}`}>{placeholder}</button>;
    </>
  }
}