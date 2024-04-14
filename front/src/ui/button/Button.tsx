import { forwardRef } from 'react'
import css from './Button.module.css'

interface ButtonsProps extends React.HTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonsProps>(
  ({ children, ...props }, ref) => {
    return (
      <button className={`${css.btn} ${props.className}`} {...props} ref={ref}>
        {children}
      </button>
    )
  },
)

export default Button
