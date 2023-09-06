import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { MessageInfoApp } from '../../type/messagesApp/interface'
import css from './MessagesInfoApp.module.css'

interface MessagesInfoAppProps {
  listMessage?: MessageInfoApp[]
  setListMessage?: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
  timeWait?: number
  maxMessage?: number
}

export interface MessagesInfoAppRef {}

const MessagesInfoApp = forwardRef<MessagesInfoAppRef, MessagesInfoAppProps>(
  ({ listMessage, setListMessage, timeWait = 3000, maxMessage = 5 }, ref) => {
    const ListMessage = useRef<HTMLUListElement | null>(null)

    const [visibility, SetVisibility] = useState(false)
    useImperativeHandle(
      ref,
      () => {
        return {}
      },
      []
    )

    useEffect(() => {
      if (!listMessage?.length || !setListMessage) {
        SetVisibility(false)
        return
      }
      SetVisibility(true)

      if (listMessage?.length > maxMessage) {
        setListMessage(prev => {
          const newList = [...prev]
          newList.pop()
          return newList
        })
      }

      let idHiddenMessages: NodeJS.Timeout

      if (listMessage?.length < 2) {
        idHiddenMessages = setTimeout(() => {
          SetVisibility(false)
        }, timeWait / 1.25)
      }

      const idDeleteItemArr = setTimeout(() => {
        setListMessage(prev => {
          const newList = [...prev]
          newList.pop()
          return newList
        })
      }, timeWait)
      return () => {
        clearTimeout(idDeleteItemArr)
        clearTimeout(idHiddenMessages)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listMessage])

    return (
      <ul
        ref={ListMessage}
        className={`${css.listMessageInfo} ${
          visibility ? css.listMessageInfoOpen : css.listMessageInfoClose
        }`}
      >
        {listMessage?.map(({ message, id, status }) => (
          <li key={id} data-status={status} className={css.message}>
            {message}
          </li>
        ))}
      </ul>
    )
  }
)
export default MessagesInfoApp
