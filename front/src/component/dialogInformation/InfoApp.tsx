import css from './InfoApp.module.css'

interface InfoAppProps {}

export default function InfoApp({}: InfoAppProps) {
  return (
    <div className={css.informationApp}>
      <p className={css.info}>
        Esta app de chat es solo para fines demostrativos.
      </p>
    </div>
  )
}
