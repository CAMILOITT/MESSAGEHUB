import { IncomingMessage } from '../../type/messages/interface'
import Message from '../message/Message'
import css from './Conversation.module.css'

interface ConversationProps {
  messages: IncomingMessage[]
}

export default function Conversation({ messages }: ConversationProps) {
  return (
    <ul className={css.conversation}>
      {messages?.map((message, key) => (
        <Message key={message._id || key} sender={message.id_sender}>
          {message.message}
        </Message>
      ))}
    </ul>
  )
}
