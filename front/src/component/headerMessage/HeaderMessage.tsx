import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import BackIcon from '../../assets/icons/BackIcon'
import MoreIcon from '../../assets/icons/MoreIcon'
import { URL_API } from '../../const/env'
import type { User } from '../../type/user/interface'
import Avatar from '../../ui/avatar/Avatar'
import Button from '../../ui/button/Button'
import DropDownMenu from '../dropDownMenu/DropDownMenu'
import InfoAccount from '../infoAccount/InfoAccount'
import Modal, { type MethodModal } from '../modal/Modal'
import css from './HeaderMessage.module.css'

interface HeaderMessageProps {
  infoChat: User | undefined
}

export default function HeaderMessage({ infoChat }: HeaderMessageProps) {
  const refInfoUser = useRef<MethodModal>(null)

  const navigation = useNavigate()

  function back() {
    navigation('/')
    new Promise(function foo(resolve, reject) {
      return resolve || reject
    })
  }

  return (
    <header className={css.headerChat}>
      <div className={css.informationChat}>
        <Button
          className={css.btnBack}
          onClick={back}
          children={<BackIcon />}
        />
        <Avatar nick="Jose" imgAvatar={`${infoChat?.img_avatar}`} />
        <h2>{infoChat?.nick}</h2>
      </div>
      <DropDownMenu
        listOption={[
          {
            name: 'información de contacto',
            action: () => {
              refInfoUser.current?.openModal()
            },
          },
        ]}
        icon={<MoreIcon />}
        direction={{ x: 'right', y: 'bottom' }}
      />
      {createPortal(
        <Modal ref={refInfoUser}>
          <InfoAccount
            description={infoChat?.description}
            imgAvatar={`${URL_API}/${infoChat?.img_avatar}`}
            name={`${infoChat?.nick}`}
            edit={false}
          />
        </Modal>,
        document.body,
      )}
    </header>
  )
}
