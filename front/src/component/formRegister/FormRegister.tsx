import { URL_API } from '../../const/env'
import { SwitchForm } from '../../type/form/type'
import { MessageInfoApp } from '../../type/messagesApp/interface'
import css from './FormRegister.module.css'

interface FormRegisterProps {
  statusSession: SwitchForm
  setStatusSession: React.Dispatch<React.SetStateAction<SwitchForm>>
  setListMessageSession: React.Dispatch<React.SetStateAction<MessageInfoApp[]>>
}

export default function FormRegister({
  statusSession,
  setStatusSession,
  setListMessageSession,
}: FormRegisterProps) {
  function informationLoginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { userName, userPassword } = e.currentTarget

    if (!userName.value || !userPassword.value) {
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

    const dataSend = { nick: userName.value, password: userPassword.value }

    setListMessageSession(prev => [
      {
        message: 'creando usuario...',
        id: crypto.randomUUID(),
        status: 'loading',
      },
      ...prev,
    ])

    fetch(`${URL_API}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataSend),
    })
      .then(res => {
        if (!res.ok) throw new Error('usuario ya existe')
        return res.json()
      })
      .then(data => {
        setListMessageSession(prev => [
          {
            message: data.message,
            id: crypto.randomUUID(),
            status: 'success',
          },
          ...prev,
        ])
        setStatusSession('login')
      })
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
      onSubmit={informationLoginUser}
      className={`${css.formRegister} ${
        statusSession === 'register' ? css.viewFormRegister : css.viewFormLogin
      } `}
    >
      <h2>Registrarse</h2>
      <label className={css.label}>
        Nombre:
        <input
          type="text"
          name="user-name"
          id="userName"
          placeholder="Nombre de usuario"
        />
      </label>
      <label className={css.label}>
        Contraseña:
        <input
          type="password"
          name="user-password"
          id="userPassword"
          placeholder="Contraseña"
        />
      </label>
      <button className={css.btnLogin}>Registrarse</button>
      <button
        type="button"
        onClick={() => setStatusSession('login')}
        className={css.changeForm}
      >
        iniciar con una cuenta
      </button>
    </form>
  )
}
