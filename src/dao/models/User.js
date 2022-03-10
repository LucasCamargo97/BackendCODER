import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true, default: 'anonymus' },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  age: { type: Number, required: true, trim: true },
  avatar: { type: String },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' }
}, { timestamps: true, versionKey: false })

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
