import MongoDBContainer from '../../contenedores/ContenedorMongoDb.js'
import {cartsModel} from '../models/carts.js'
import { productsModel } from '../models/products.js'

export default class CartsMongoDB extends MongoDBContainer {
  async createCart () {
    try {
      const cart = await cartsModel.create({ products: [] })
      return { status: 'success', message: `Cart with ID ${cart._id} has been created successfully.` }
    } catch (err) {
      console.log(`Create cart error: ${err.message}`)
      return { status: 'error', message: 'Create cart error.' }
    }
  }

  async getProductsByCartId (cartId) {
    try {
      if (!cartId) throw new Error('Missing \'id\' parameter!')

      const cart = await cartsModel.findById(cartId)
      const products = cart.products

      return { status: 'success', payload: products }
    } catch (err) {
      console.log(`Products cart error: ${err.message}`)
      return { status: 'error', message: err.message }
    }
  }

  async addProductToCart (cartId, productId) {
    try {
      if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')

      const product = await productsModel.findById(productId)
      if (!product) throw new Error('Non-existent product.')

      const cart = await cartsModel.findById(cartId)
      if (!cart) throw new Error('Non-existent cart.')

      await cartsModel.findByIdAndUpdate(cartId, { $push: { products: product } })
      return { status: 'success', payload: 'Product has been added successfully.' }
    } catch (err) {
      console.log(`Product add error: ${err.message}`)
      return { status: 'error', message: 'Product add error.' }
    }
  }

  async deleteCartById (cartId) {
    try {
      if (!cartId) throw new Error('Missing \'cartId\' parameter!')

      const cart = await cartsModel.findById(cartId)
      if (!cart) throw new Error('Non-existent cart.')

      await cartsModel.findByIdAndDelete(cartId)

      return { status: 'success', message: 'Cart has been deleted successfully.' }
    } catch (err) {
      console.log(`Delete cart error: ${err.message}`)
      return { status: 'error', message: 'Delete cart error.' }
    }
  }

  async deleteProductFromCart (cartId, productId) {
    try {
      if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')

      const cart = await cartsModel.findById(cartId)
      if (!cart) throw new Error('Non-existent cart.')

      await cartsModel.findByIdAndUpdate(cartId, { $pull: { products: productId } })

      return { status: 'success', payload: 'Product has been deleted successfully.' }
    } catch (err) {
      console.log(`Product add error: ${err.message}`)
      return { status: 'error', message: 'Product add error.' }
    }
  }
}