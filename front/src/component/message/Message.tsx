import { useContext } from 'react'
import { UserContext } from '../../context/user/User'
import css from './Message.module.css'

interface MessageProps {
  children: React.ReactNode
  sender: string
}

export default function Message({ children, sender }: MessageProps) {
  const { infoUser } = useContext(UserContext)

  return (
    <li
      className={`${
        infoUser._id === sender ? css.messageRight : css.messageLeft
      } ${css.message}`}>
      <p className={css.messageUser}>{children}</p>
    </li>
  )
}
