import mongoose from 'mongoose'

import { CONSTANTS } from './constants.js'

const createDatabaseConnection = async () => {
  try {
    await mongoose.connect(CONSTANTS.TOKENS.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connection is successful')
  } catch (error) {
    console.error('Connection error', error)
  }
}

export {
  createDatabaseConnection
}