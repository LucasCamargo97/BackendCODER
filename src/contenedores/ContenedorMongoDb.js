import mongoose from 'mongoose'
import { MONGO_URI } from '../config.js'

export default class MongoDBContainer {
  constructor () {
    this.getConnection()
  }

  async getConnection () {
    try {
      if (mongoose.connection.readyState === 0) {
        mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
          if (err) throw err
          console.log('Connected to MongoDB.')
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
}