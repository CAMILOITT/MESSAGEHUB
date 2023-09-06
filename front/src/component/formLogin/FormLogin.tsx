import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { URL_API } from '../../const/env'
import { UserContext } from '../../context/user/User'
import { SwitchForm } from '../../type/form/type'
import { MessageInfoApp } from '../../type/messagesApp/interface'
import { InfoUser } from '../../type/user/interface'
import css from './FormLogin.module.css'

interface FormLoginProps {
  statusSession: SwitchForm
  setStatusSession: React.Dispatch<React.SetStateAction<SwitchForm>>
  setListMessageSession: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
}

export default function FormLogin({
  statusSession,
  setStatusSession,
  setListMessageSession,
}: FormLoginProps) {
  const navigate = useNavigate()

  const { setInfoUser } = useContext(UserContext)

  function informationLoginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { userNameLogin, userPasswordLogin } = e.currentTarget

    if (!userNameLogin.value || !userPasswordLogin.value) {
      setListMessageSession(prev => [
        {
          message: 'Todos los campos son obligatorios',
          id: crypto.randomUUID(),
          status: 'error',
        },
        ...prev,
      ])
      return
    }

    const dataSend = {
      nick: userNameLogin.value,
      password: userPasswordLogin.value,
    }

    const configurationFetch: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    }

    fetch(`${URL_API}/login`, configurationFetch)
      .then(res => {
        if (!res.ok) throw new Error('credenciales incorrectas')
        return res.json()
      })
      .then(
        (data: {
          token: string
          data: {
            list_contact: InfoUser[] | []
          } & InfoUser
        }) => {
          const { token, data: infoUser } = data
          localStorage.setItem('Auth', token)
          localStorage.setItem('id', infoUser._id)

          const date = new Date(Date.now())
          const year = date.getFullYear()
          const month = date.getMonth()
          const day = date.getDate() + 7

          const expires = new Date(year, month, day, -5, 0, 0, 0).toUTCString()

          document.cookie = `token=${token}; expires=${expires}; path=/; `

          navigate('/')
          setInfoUser(data.data)
        }
      )
      .catch((err: Error) => {
        setListMessageSession(prev => [
          {
            message: err.message,
            id: crypto.randomUUID(),
            status: 'error',
          },
          ...prev,
        ])
      })
  }

  return (
    <form
      className={`${css.formLogin} ${
        statusSession === 'login' ? css.viewFormLogin : css.viewFormRegister
      } `}
      onSubmit={informationLoginUser}
    >
      <h2>Iniciar session</h2>
      <label className={css.label}>
        Nombre:
        <input
          type="text"
          name="user-name-login"
          id="userNameLogin"
          placeholder="Nombre de usuario"
        />
      </label>
      <label className={css.label}>
        Contraseña:
        <input
          type="password"
          name="user-password-login"
          id="userPasswordLogin"
          placeholder="Contraseña"
        />
      </label>
      <button className={css.btnLogin}>Ingresar</button>
      <button
        type="button"
        onClick={() => setStatusSession('register')}
        className={css.changeForm}
      >
        crear una cuenta
      </button>
    </form>
  )
}
