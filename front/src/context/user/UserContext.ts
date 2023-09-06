import { User } from '../../type/user/interface'

export const initialValueUser: User = {
  _id: localStorage.getItem('id') || '',
  nick: '',
  img_avatar: '',
  description: '',
}

export const initValueListContact: User[] = []

export const ContextUser: {
  infoUser: User
  setInfoUser: (data: User) => void
  listContact: User[]
  setListContact: React.Dispatch<React.SetStateAction<User[]>>
  listSearch: User[]
  setListSearch: React.Dispatch<React.SetStateAction<User[]>>
} = {
  infoUser: initialValueUser,
  setInfoUser: (data: User) => data,
  listContact: initValueListContact,
  setListContact: data => data,
  listSearch: initValueListContact,
  setListSearch: data => data,
}
