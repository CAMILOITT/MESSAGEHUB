export interface User {
  _id: string
  nick: string
  img_avatar?: string
  description?: string
}

export interface InfoUser extends User {
  list_contact: User[]
}

export interface Session {
  token: string
}
