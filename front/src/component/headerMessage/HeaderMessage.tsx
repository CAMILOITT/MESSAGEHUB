import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import BackIcon from '../../assets/icons/BackIcon'
import ImgUser from '../../assets/icons/ImgUser'
import MoreIcon from '../../assets/icons/MoreIcon'
import { URL_API } from '../../const/env'
import { User } from '../../type/user/interface'
import DropDownMenu from '../dropDownMenu/DropDownMenu'
import InfoAccount from '../infoAccount/InfoAccount'
import Modal, { MethodModal } from '../modal/Modal'
import css from './HeaderMessage.module.css'

interface HeaderMessageProps {
  infoChat: User | undefined
}

export default function HeaderMessage({ infoChat }: HeaderMessageProps) {
  const refInfoUser = useRef<MethodModal>(null)

  const navigation = useNavigate()

  function back() {
    navigation('/')
  }

  return (
    <header className={css.headerChat}>
      <div className={css.informationChat}>
        <button className={css.btnBack} onClick={back}>
          <BackIcon />
        </button>
        {!infoChat?.img_avatar ? (
          <ImgUser nick={`${infoChat?.nick}`} />
        ) : (
          <img
            src={`${URL_API}/${infoChat?.img_avatar}`}
            alt="name room"
            className={css.imgChat}
          />
        )}
        <h2>{infoChat?.nick}</h2>
      </div>
      <DropDownMenu
        listOption={[
          {
            function: () => {
              refInfoUser.current?.openModal()
            },
            name: 'info',
          },
        ]}
        icon={<MoreIcon />}
        direction={{ x: 'right', y: 'bottom' }}
      />
      {createPortal(
        <Modal ref={refInfoUser}>
          <InfoAccount
            description={infoChat?.description}
            img_avatar={infoChat?.img_avatar}
            name={`${infoChat?.nick}`}
            edit={false}
          />
        </Modal>,
        document.body
      )}
    </header>
  )
}
