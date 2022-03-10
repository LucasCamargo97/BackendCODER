import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  picture: { type: String, required: true }
}, { timestamps: true, versionKey: false })

const Product = model('Product', ProductSchema)

export default Product
