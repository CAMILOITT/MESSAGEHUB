import { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useParams } from 'react-router-dom'
import { socket } from '../../api/sockets/sockets'
import { URL_API } from '../../const/env'
import { UserContext } from '../../context/user/User'
import { IncomingMessage } from '../../type/messages/interface'
import { MessageInfoApp } from '../../type/messagesApp/interface'
import Conversation from '../conversation/Conversation'
import HeaderMessage from '../headerMessage/HeaderMessage'
import MessagesInfoApp from '../messagesInfoApp/MessagesInfoApp'
import SendMessage from '../sendMessage/SendMessage'
import css from './BodyConversation.module.css'

interface BodyConversationProps {}

export default function BodyConversation({}: BodyConversationProps) {
  const { contactsId } = useParams()
  const [listMessageInfo, setListMessageInfo] = useState<MessageInfoApp[]>([])
  const { listContact: list_contact, infoUser } = useContext(UserContext)

  const [infoChat, setInfoChat] = useState(
    list_contact.find(user => user._id === contactsId)
  )

  useEffect(() => {
    setInfoChat(list_contact.find(user => user._id === contactsId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactsId, list_contact])

  const [messages, setMessages] = useState<IncomingMessage[]>([])

  useEffect(() => {
    if (!infoChat?._id || !infoUser._id) return

    const data = {
      id_sender: infoUser._id,
      id_receiver: infoChat?._id,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Auth') || '',
      },
      body: JSON.stringify(data),
    }
    fetch(`${URL_API}/getMessages`, options)
      .then(res => {
        if (!res.ok) throw new Error('hubo un error al obtener los mensajes')
        return res.json()
      })
      .then(data => {
        setMessages(data)
      })
      .catch((err: Error) => {
        setListMessageInfo(prev => [
          ...prev,
          {
            message: `${err.message}`,
            id: crypto.randomUUID(),
            status: 'success',
          },
        ])
      })
  }, [infoChat, infoUser._id])

  useEffect(() => {
    socket.on('getMessage', newMessage => {
      setMessages(message => [newMessage, ...message])
    })

    return () => {
      socket.off('getMessage')
    }
  }, [])

  return (
    <div className={css.interfaceChat}>
      {createPortal(
        <MessagesInfoApp
          listMessage={listMessageInfo}
          setListMessage={setListMessageInfo}
          maxMessage={2}
          timeWait={3000}
        />,
        document.body
      )}
      <HeaderMessage infoChat={infoChat} />
      <Conversation messages={messages} />
      <SendMessage
        infoChat={infoChat}
        setMessage={setMessages}
        setListMessage={setListMessageInfo}
      />
    </div>
  )
}
