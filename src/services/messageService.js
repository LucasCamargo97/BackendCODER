import Message from '../models/Message.js'

export default class MessageService {
  async getMessages () {
    return await Message.find().populate('author')
  }

  async save (message) {
    return await Message.create(message)
  }
}
