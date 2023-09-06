import { Navigate, Outlet } from 'react-router-dom'

interface UserUnLoggedProps {
  navigate: string
}
export default function UserUnLogged({ navigate = '/session' }: UserUnLoggedProps) {
  if (Boolean(localStorage.getItem('Auth')) === true) {
    return <Navigate to={navigate} />
  }

  return <Outlet />
}
