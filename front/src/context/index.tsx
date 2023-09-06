import { UserProvider } from './user/User'

interface StateProviderProps {
  children: React.ReactNode
}

export default function StateProvider({ children }: StateProviderProps) {
  return <UserProvider>{children}</UserProvider>
}
