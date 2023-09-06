import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import NewChatIcon from '../../assets/icons/NewChatIcon'
import { MessageInfoApp } from '../../type/messagesApp/interface'
import HeaderAside from '../headerAside/HeaderAside'
import ListChats from '../listChats/ListChats'
import MessagesInfoApp from '../messagesInfoApp/MessagesInfoApp'
import Modal, { MethodModal } from '../modal/Modal'
import SearchContact from '../searchContact/SearchContact'
import css from './Sidebar.module.css'
interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const refSearchContact = useRef<MethodModal>(null)

  const [listMessageInfo, setListMessageInfo] = useState<MessageInfoApp[]>([])

  return (
    <aside className={css.sidebar}>
      <HeaderAside setListMessageInfo={setListMessageInfo} />
      <ListChats setListMessageInfo={setListMessageInfo} />
      <button
        className={css.createChat}
        onClick={() => refSearchContact.current?.openModal()}
      >
        <NewChatIcon />
      </button>
      {createPortal(
        <Modal ref={refSearchContact}>
          <SearchContact setListMessageInfo={setListMessageInfo} />
        </Modal>,
        document.body
      )}
      {createPortal(
        <MessagesInfoApp
          listMessage={listMessageInfo}
          setListMessage={setListMessageInfo}
          maxMessage={2}
          timeWait={3000}
        />,
        document.body
      )}
    </aside>
  )
}
