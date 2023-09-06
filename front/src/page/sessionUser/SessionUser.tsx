import Login from "../../component/login/Login";
import css from "./SessionUser.module.css"

interface SessionUserProps {}

export default function SessionUser({}: SessionUserProps) {
  return (
    <main className={css.session} >
      <Login />
    </main>
  )
}
