import { useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Outlet, useParams } from 'react-router-dom'
import { socket } from '../../api/sockets/sockets'
import InfoApp from '../../component/dialogInformation/InfoApp'
import Modal, { type MethodModal } from '../../component/modal/Modal'
import Sidebar from '../../component/sidebar/Sidebar'
import css from './Chats.module.css'

interface ChatsProps {}

export default function Chats({}: ChatsProps) {
  const refInfoWeb = useRef<MethodModal>(null)

  const { contactsId } = useParams()

  useEffect(() => {
    socket.emit('login', localStorage.getItem('id'))
  }, [])

  useLayoutEffect(() => {
    refInfoWeb.current?.openModal()
  }, [])

  return (
    <main
      className={`${css.interface} ${
        !contactsId ? css.focusAside : css.focusChat
      }`}>
      <Sidebar />
      <Outlet context={{ contactsId }} />

      {createPortal(
        <Modal ref={refInfoWeb}>
          <InfoApp />
        </Modal>,
        document.body,
      )}
    </main>
  )
}
