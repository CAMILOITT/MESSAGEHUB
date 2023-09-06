import { useContext, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import MoreIcon from '../../assets/icons/MoreIcon'
import SearchIcon from '../../assets/icons/SearchIcon'
import { UserContext } from '../../context/user/User'
import { MessageInfoApp } from '../../type/messagesApp/interface'
import DropDownMenu from '../dropDownMenu/DropDownMenu'
import InfoAccount from '../infoAccount/InfoAccount'
import Modal, { MethodModal } from '../modal/Modal'
import css from './HeaderAside.module.css'

interface HeaderAsideProps {
  setListMessageInfo: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
}

export default function HeaderAside({ setListMessageInfo }: HeaderAsideProps) {
  const navigate = useNavigate()
  const refInFoAccount = useRef<MethodModal>(null)

  const {
    listContact: list_contact,
    setListSearch,
    infoUser,
  } = useContext(UserContext)

  function searchContactList(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.currentTarget
    if (!value) {
      setListSearch([])
      return
    }
    const newList = list_contact.filter(contact => contact.nick.includes(value))
    setListSearch(newList)
  }

  return (
    <div className={css.header}>
      <DropDownMenu
        listOption={[
          {
            function: () => {
              const { documentElement } = document

              const theme = documentElement.getAttribute('data-theme')

              if (theme === 'light') {
                documentElement.setAttribute('data-theme', 'dark')
              }

              if (theme === 'dark') {
                documentElement.setAttribute('data-theme', 'light')
              }
            },
            name: 'cambiar tema',
          },
          {
            function: () => {
              refInFoAccount.current?.openModal()
            },
            name: 'information',
          },
          {
            function: () => {
              localStorage.removeItem('Auth')
              localStorage.removeItem('id')
              document.cookie = 'nombre=; max-age=0; path=/'
              navigate('/session')
            },
            name: 'salir',
          },
        ]}
        direction={{ x: 'left', y: 'bottom' }}
        icon={<MoreIcon />}
      />
      <label className={css.search}>
        <input
          type="search"
          className={css.inputSearch}
          placeholder="Search"
          onChange={searchContactList}
        />
        <SearchIcon />
      </label>
      {createPortal(
        <Modal ref={refInFoAccount}>
          <InfoAccount
            name={infoUser.nick}
            description={infoUser.description}
            edit={true}
            img_avatar={infoUser.img_avatar?.split('/').pop()}
            setListMessageInfo={setListMessageInfo}
          />
        </Modal>,
        document.body
      )}
    </div>
  )
}
