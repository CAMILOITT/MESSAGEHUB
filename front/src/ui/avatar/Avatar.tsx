import { forwardRef } from 'react'
import ImgUser from '../../assets/icons/ImgUser'
import css from './Avatar.module.css'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  imgAvatar: string
  nick: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ imgAvatar, nick, ...props }, ref) => {
    if (!imgAvatar)
      return (
        <div
          ref={ref}
          {...props}
          className={`${css.avatar} ${props.className}`}
          role="img"
          aria-label="avatarLabel">
          <ImgUser nick={`${nick}`} />
        </div>
      )

    return (
      <figure
        ref={ref}
        {...props}
        className={`${css.avatar} ${props.className}`}
        aria-labelledby="avatarLabel">
        <img
          src={`${imgAvatar}`}
          alt={`avatar ${nick}`}
          className={css.imgAvatar}
        />
      </figure>
    )
  },
)

export default Avatar
