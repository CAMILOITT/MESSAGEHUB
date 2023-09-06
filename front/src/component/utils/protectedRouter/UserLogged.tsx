import { Navigate, Outlet } from 'react-router-dom'

interface UserLoggedProps {
  navigate: string
}
export default function UserLogged({ navigate = '/session' }: UserLoggedProps) {
  if (!localStorage.getItem('Auth')) {
    return <Navigate to={navigate} />
  }

  return <Outlet />
}
