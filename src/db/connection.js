import mongoose from 'mongoose'
import { MONGO } from '../config/config.js'
import initDatabase from './initDatabase.js'
import loggerHandler from '../middlewares/loggerHandler.js'

const logger = loggerHandler()

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO.URI, { useNewUrlParser: true, useUnifiedTopology: true })
      logger.info('A connection to MongoDB has been established.')
      initDatabase()
    } catch (err) {
      logger.error(err.message)
    }
  }
}
