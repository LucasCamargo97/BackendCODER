import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  status: { type: String, default: 'available' }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false })

const Product = model('Product', ProductSchema)

export default Product
