import { forwardRef, useEffect, useState } from 'react'
import ErrorIcon from '../../assets/icons/StatusFunction/ErrorIcon'
import InfoIcon from '../../assets/icons/StatusFunction/InfoIcon'
import LoadingIcon from '../../assets/icons/StatusFunction/LoadingIcon'
import SuccessIcon from '../../assets/icons/StatusFunction/SuccessIcon'
import type { MessageInfoApp } from '../../type/messagesApp/interface'
import css from './MessagesInfoApp.module.css'

interface MessagesInfoAppProps {
  listMessage?: MessageInfoApp[]
  setListMessage?: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
  timeWait?: number
  maxMessage?: number
}

const ICONS_STATUS = {
  loading: <LoadingIcon />,
  success: <SuccessIcon />,
  warning: <ErrorIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
}

export interface MessagesInfoAppRef {}

const MessagesInfoApp = forwardRef<HTMLUListElement, MessagesInfoAppProps>(
  (
    { listMessage, setListMessage, timeWait = 3000, maxMessage = 5 },
    RefList,
  ) => {
    const [visibility, SetVisibility] = useState(false)

    useEffect(() => {
      const listLength = listMessage?.length
      console.log(listLength)

      if (!listLength || !setListMessage) {
        SetVisibility(false)
        return
      }

      SetVisibility(true)

      if (listLength > maxMessage) {
        setListMessage(prev => {
          const newList = [...prev]
          newList.shift()
          return newList
        })
      }

      let idHiddenMessages: NodeJS.Timeout

      if (listLength < 2) {
        idHiddenMessages = setTimeout(() => {
          SetVisibility(false)
        }, timeWait / 1.25)
      }

      const idDeleteItemArr = setTimeout(() => {
        setListMessage(prev => {
          const newList = [...prev]
          newList.shift()
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
        ref={RefList}
        className={`${css.listMessageInfo} ${
          visibility ? css.listMessageInfoOpen : css.listMessageInfoClose
        }`}>
        {listMessage?.map(({ message, id, status }) => (
          <li
            key={id}
            data-status={status}
            className={css.message}>
            {ICONS_STATUS[status]} {message}
          </li>
        ))}
      </ul>
    )
  },
)

export default MessagesInfoApp
