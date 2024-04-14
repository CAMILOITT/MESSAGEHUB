import { forwardRef } from 'react'
import css from './Notifications.module.css'

interface NotificationsProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
}

const Notifications = forwardRef<HTMLDivElement, NotificationsProps>(
  ({ message, ...props }, ref) => {
    return (
      <div
        className={`${css.notifications} ${props.className}`}
        {...props}
        ref={ref}
        aria-label="notifications">
        <span>{message}</span>
      </div>
    )
  },
)

export default Notifications
