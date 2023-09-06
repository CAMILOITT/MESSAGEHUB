export interface Message {
  id_sender: string
  id_receiver: string | undefined
  message: string
}

export interface IncomingMessage extends Message {
  _id: string
}
