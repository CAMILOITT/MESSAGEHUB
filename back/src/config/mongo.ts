import { connect } from 'mongoose'
import { ENV_DB_URI } from '../const/env'

async function dbConnect() {
  await connect(ENV_DB_URI)
}

export default dbConnect
;('https://messagehub-back-wer7-dev.fl0.io/')
