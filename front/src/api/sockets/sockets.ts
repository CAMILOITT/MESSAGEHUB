import { io } from 'socket.io-client'
import { URL_API } from '../../const/env'

const configOptions = { transports: ['websocket'] }
export const socket = io(URL_API, configOptions)
