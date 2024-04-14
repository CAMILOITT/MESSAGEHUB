import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import BodyConversation from './component/bodyConversation/BodyConversation'
import NotChat from './component/notChat/NotChat'
import UserLogged from './component/utils/protectedRouter/UserLogged'
import UserUnLogged from './component/utils/protectedRouter/UserUnLogged'
import Chats from './page/chats/Chats'
import SessionUser from './page/sessionUser/SessionUser'

function App() {
  useEffect(() => {
    const systemColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    document.documentElement.setAttribute('data-theme', systemColorScheme)
    // document
    //   .querySelector('html')
    //   ?.setAttribute('data-theme', systemColorScheme)
  }, [])

  return (
    <Routes>
      <Route element={<UserLogged navigate="/session" />}>
        <Route path="/" element={<Chats />}>
          <Route index element={<NotChat />} />
          <Route path=":contactsId" element={<BodyConversation />} />
        </Route>
      </Route>

      <Route element={<UserUnLogged navigate="/" />}>
        <Route path="/session" element={<SessionUser />} />
      </Route>
    </Routes>
  )
}

export default App
