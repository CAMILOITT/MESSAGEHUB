import { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { socket } from '../../api/sockets/sockets'
import ImgUser from '../../assets/icons/ImgUser'
import { URL_API } from '../../const/env'
import { UserContext } from '../../context/user/User'
import { MessageInfoApp } from '../../type/messagesApp/interface'
import { User } from '../../type/user/interface'
import ContextMenu, { ContextMenuRef } from '../contextMenu/ContextMenu'
import css from './ListChats.module.css'

interface ListChatsProps {
  setListMessageInfo: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
}

export default function ListChats({ setListMessageInfo }: ListChatsProps) {
  const { listContact, listSearch, infoUser, setListContact } =
    useContext(UserContext)
  const [contactsId, setContactsId] = useState('')
  const { contactsId: idUrl } = useParams()
  const navigate = useNavigate()
  const refContextMenu = useRef<ContextMenuRef>(null)

  function deleteChat() {
    const config: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Auth') || '',
      },
      body: JSON.stringify({
        id: infoUser._id,
        id_contact: contactsId,
      }),
    }

    fetch(`${URL_API}/deleteContact`, config)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then(data => {
        if (contactsId === idUrl) {
          navigate('/')
        }
        setListContact(data.list_contact)
      })
      .catch((error: Error) => {
        setListMessageInfo(prev => [
          ...prev,
          {
            message: `${error.message}`,
            id: crypto.randomUUID(),
            status: 'success',
          },
        ])
      })
  }

  useEffect(() => {
    socket.on('addContact', ({ _id: id, nick }: User) => {
      const result = listContact.some(({ _id }) => _id === id)

      if (result) return

      setListContact(prev => [{ _id: id, nick }, ...prev])
    })
    return () => {
      socket.off('addContact')
    }
  }, [listContact, setListContact])

  return (
    <>
      {Boolean(listSearch.length) && (
        <ul className={css.listChats}>
          <li>
            <h5>results</h5>
          </li>
          {listSearch.map(({ _id, nick, img_avatar }) => (
            <li key={_id}>
              <NavLink to={`/${_id}`} className={css.chat}>
                {!img_avatar ? (
                  <ImgUser nick={nick} />
                ) : (
                  <img
                    src={`${URL_API}/${img_avatar}`}
                    alt="image Avatar"
                    className={css.imgChat}
                  />
                )}
                {nick}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <ul className={css.listChats}>
        {Boolean(listSearch.length) && (
          <li>
            <h5>Chats</h5>
          </li>
        )}
        {listContact.map(({ _id, nick, img_avatar }, key) => (
          <li key={_id || key}>
            <NavLink
              to={`/${_id}`}
              className={({ isActive }) =>
                isActive ? `${css.chatActive} ${css.chat}` : css.chat
              }
              onContextMenu={e => {
                refContextMenu.current?.openMenu(e)
                setContactsId(_id)
              }}
            >
              {!img_avatar ? (
                <ImgUser nick={nick} />
              ) : (
                <img
                  src={`${URL_API}/${img_avatar}`}
                  alt="image Avatar"
                  className={css.imgChat}
                />
              )}

              {nick}
            </NavLink>
          </li>
        ))}
      </ul>

      <ContextMenu
        ref={refContextMenu}
        listOption={[{ name: 'eliminar chat', event: deleteChat }]}
        parentSize={true}
      />
    </>
  )
}
