import { useContext } from 'react'
import { socket } from '../../api/sockets/sockets'
import SendMessageIcon from '../../assets/icons/SendMessageIcon'
import { URL_API } from '../../const/env'
import { UserContext } from '../../context/user/User'
import { IncomingMessage } from '../../type/messages/interface'
import { MessageInfoApp } from '../../type/messagesApp/interface'
import { User } from '../../type/user/interface'
import css from './SendMessage.module.css'

interface SendMessageProps {
  infoChat: User | undefined
  setMessage: React.Dispatch<React.SetStateAction<IncomingMessage[]>>
  setListMessage: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
}

export default function SendMessage({
  infoChat,
  setMessage,
  setListMessage,
}: SendMessageProps) {
  const { infoUser } = useContext(UserContext)

  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { messageUser } = e.currentTarget
    if (!messageUser.value || messageUser.value.length <= 0) return
    const configuration = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Auth') || '',
      },
      body: JSON.stringify({
        id_receiver: infoChat?._id,
        id_sender: infoUser._id,
        message: messageUser.value,
      }),
    }

    fetch(`${URL_API}/sendMessage`, configuration)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then(({ _id, id_receiver, id_sender, message }) => {
        const newMessage: IncomingMessage = {
          _id,
          id_receiver,
          id_sender,
          message,
        }

        socket.emit('sendMessage', newMessage)

        setMessage(message => [newMessage, ...message])
      })
      .catch((error: Error) => {
        setListMessage(prev => [
          ...prev,
          {
            message: `${error.message}`,
            id: crypto.randomUUID(),
            status: 'success',
          },
        ])
      })

    messageUser.value = ''
  }

  return (
    <form onSubmit={sendMessage} className={css.sendMessage} autoComplete="off">
      <input
        type="text"
        name="messageUser"
        id="message-user"
        className={css.message}
        placeholder="Escribe un mensaje"
      />
      <button className={css.btnMessage}>
        <SendMessageIcon />
      </button>
    </form>
  )
}
