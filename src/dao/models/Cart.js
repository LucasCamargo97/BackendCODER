import { Schema, model } from 'mongoose'

const CartSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', unique: true }
}, { timestamps: true, versionKey: false })

const Cart = model('Cart', CartSchema)

export default Cart
