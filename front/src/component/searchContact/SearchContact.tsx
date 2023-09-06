import { useContext, useState } from 'react'
import { socket } from '../../api/sockets/sockets'
import SendMessageIcon from '../../assets/icons/SendMessageIcon'
import { URL_API } from '../../const/env'
import { UserContext } from '../../context/user/User'
import { MessageInfoApp } from '../../type/messagesApp/interface'
import { User } from '../../type/user/interface'
import InputSearch from '../inputSearch/InputSearch'
import css from './SearchContact.module.css'

interface SearchContactProps {
  setListMessageInfo: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
}

export default function SearchContact({ setListMessageInfo }: SearchContactProps) {
  const [listUsers, setListUsers] = useState<User[]>([])

  const { infoUser, setListContact } = useContext(UserContext)

  function addContact(id_contact: string) {
    const configPetition = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Auth') || '',
      },
      body: JSON.stringify({ id: infoUser._id, id_contact }),
    }

    fetch(`${URL_API}/addUser`, configPetition)
      .then(res => {
        if (!res.ok)
          throw new Error('el usuario ya esta en tu lista de contactos')
        return res.json()
      })
      .then(data => {
        return data
      })
      .then(({ _id, nick, img_avatar, description }: User) => {
        console.log(_id, nick, img_avatar, description)
        if (!_id || !nick)
          throw new Error('no se pudo obtener los datos del usuario')

        setListMessageInfo(prev => [
          ...prev,
          {
            message: `Usuario ${nick} añadido a tu lista de contactos`,
            id: crypto.randomUUID(),
            status: 'success',
          },
        ])
        setListContact(prev => [...prev, { _id, nick }])
        socket.emit('addContact', {
          _id: infoUser._id,
          nick: infoUser.nick,
          id_contact: _id,
        })
      })
      .catch((err: Error) => {
        setListMessageInfo(prev => [
          ...prev,
          {
            message: `${err.message}`,
            id: crypto.randomUUID(),
            status: 'error',
          },
        ])
      })
  }

  function searchUser(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()

    const searchUsers = e.currentTarget.value

    const configPetition = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Auth') || '',
      },
      body: JSON.stringify({ nick: searchUsers, user_nick: infoUser.nick }),
    }

    fetch(`${URL_API}/searchUser`, configPetition)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then(data => {
        setListUsers(data)
      })
      .catch(() => setListUsers([]))
  }

  return (
    <div className={css.dialogSearch}>
      <InputSearch Change={searchUser} />
      {!listUsers.length && <span>Usuario no encontrado</span>}
      <ul className={css.listUsers}>
        {listUsers.map(user => (
          <li key={user._id} className={css.user}>
            {user.nick}
            <button
              onClick={() => {
                addContact(user._id)
              }}
              className={css.btnAdd}
            >
              <SendMessageIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
