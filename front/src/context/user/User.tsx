import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URL_API } from '../../const/env'
import type { User } from '../../type/user/interface'
import {
  ContextUser,
  initValueListContact,
  initialValueUser,
} from './UserContext'

export const UserContext = createContext(ContextUser)

interface UserProviderProps {
  children: React.ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [infoUser, setInfoUser] = useState<User>(initialValueUser)

  const [listContact, setListContact] = useState(initValueListContact)

  const [listSearch, setListSearch] = useState(initValueListContact)

  const navigate = useNavigate()

  useEffect(() => {
    if (!infoUser._id) return

    const configGet: RequestInit = {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Auth') || '',
      },
    }

    fetch(`${URL_API}/getPerfil/${infoUser._id}`, configGet)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then(data => {
        if (!data) return
        setListContact(data.list_contact)
        setInfoUser({ ...data, img_avatar: `${URL_API}/${data.img_avatar}` })
      })
      .catch(() => {
        navigate('/session')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoUser.nick, infoUser._id])

  const data = {
    infoUser,
    setInfoUser,
    listContact,
    setListContact,
    listSearch,
    setListSearch,
  }
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}
