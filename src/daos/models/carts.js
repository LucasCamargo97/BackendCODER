import mongoose from 'mongoose'
// import { ProductsSchema } from './products.js'
const { Schema } = mongoose
const collectionRef = 'carts'

const CartsSchema = new Schema({
  // products: { type: [ProductsSchema], default: undefined }
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
}, { timestamps: true })

export const cartsModel = mongoose.model(collectionRef, CartsSchema)
