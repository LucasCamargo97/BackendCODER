import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  status: { type: Boolean, default: true },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
  phone: { type: String, required: true, trim: true },
  profile_picture: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false })

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password
  }
})

const User = model('User', UserSchema)

export default User
