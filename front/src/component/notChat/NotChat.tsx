import css from './NotChat.module.css'
interface NotChatProps {}

export default function NotChat({}: NotChatProps) {
  return (
    <div className={css.notChat}>
      <p className={css.message}>
        Seleccione un chat para empezar agrega aun contacto para empezar
      </p>
    </div>
  )
}
