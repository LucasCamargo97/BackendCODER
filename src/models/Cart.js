import { Schema, model } from 'mongoose'

const CartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ]

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false })

const Cart = model('Cart', CartSchema)

export default Cart
