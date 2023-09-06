import { useState } from 'react'
import AppIcon from '../../assets/icons/AppIcon'
import FormLogin from '../formLogin/FormLogin'
import FormRegister from '../formRegister/FormRegister'
import MessagesInfoApp from '../messagesInfoApp/MessagesInfoApp'
import css from './Login.module.css'
import { createPortal } from 'react-dom'
import { SwitchForm } from '../../type/form/type'
import { MessageInfoApp } from '../../type/messagesApp/interface'
interface LoginProps {}

export default function Login({}: LoginProps) {
  const [statusSession, setStatusSession] = useState<SwitchForm>('login')

  const [listMessageSession, setListMessageSession] = useState<
    MessageInfoApp[]
  >([])

  return (
    <div className={css.login}>
      {createPortal(
        <MessagesInfoApp
          listMessage={listMessageSession}
          setListMessage={setListMessageSession}
          maxMessage={3}
        />,
        document.body
      )}

      <AppIcon />
      <div className={css.forms}>
        <FormLogin
          statusSession={statusSession}
          setStatusSession={setStatusSession}
          setListMessageSession={setListMessageSession}
        />
        <FormRegister
          statusSession={statusSession}
          setStatusSession={setStatusSession}
          setListMessageSession={setListMessageSession}
        />
      </div>
    </div>
  )
}
