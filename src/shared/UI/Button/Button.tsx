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
}>

export function Button({ variant = 'primary', size = 'base', placeholder = 'Click me', href }: ButtonProps) {
  if (href) {
    return <a className={`button ${buttonVariant[variant]} ${buttonSize[size]}`} href={href}>{placeholder}</a>
  } else {
    return <button className={`button ${buttonVariant[variant]} ${buttonSize[size]}`}>{placeholder}</button>
  
  }
}