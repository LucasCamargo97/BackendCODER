import { Schema, model } from 'mongoose'

const MessageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false })

const Message = model('Message', MessageSchema)

export default Message
