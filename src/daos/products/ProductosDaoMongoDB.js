import MongoDBContainer from '../../contenedores/ContenedorMongoDb.js'
import { __dirname } from '../../utils.js'
import { productsModel } from '../models/products.js'

export default class ProductsMongoDB extends MongoDBContainer {
  async getAll () {
    try {
      const products = await productsModel.find()
      return { status: 'success', payload: products }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async getById (productId) {
    try {
      if (!productId) throw new Error('Missing \'productId\' parameter!')

      const product = await productsModel.findById(productId)
      if (!product) throw new Error('Non-existent product.')

      return { status: 'success', payload: product }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async createProduct (product) {
    try {
      if (Object.keys(body).length === 0) throw new Error('Missing or empty \'body product\' parameter!')
      if (!body.title || !body.description || !body.code || !body.thumbnail || !body.price || !body.stock) throw new Error('Body product parameter is badly formed.')

      const product = await ProductModel.findOne({ title: { $eq: body.title } })
      if (product) throw new Error('Product already exists.')

      body.stock = parseInt(body.stock)
      body.price = parseInt(body.price)

      const productCreated = await productsModel.create(body)

      return { status: 'success', payload: productCreated }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async updateProduct (productId, product) {
    try {
      if (!productId || Object.keys(body).length === 0) throw new Error('Missing or empty \'productId\' or \'body product\' parameter!')
      if (!body.title || !body.description || !body.code || !body.thumbnail || !body.price || !body.stock) throw new Error('Body product parameter is badly formed.')

      const product = await productsModel.findById(productId)
      if (!product) throw new Error('Non-existent product.')

      const productFound = await ProductModel.findOne({ _id: { $ne: productId }, title: { $eq: body.title } })
      if (productFound) throw new Error('Product already exists.')

      body.stock = parseInt(body.stock)
      body.price = parseInt(body.price)

      await ProductModel.findByIdAndUpdate(productId, { $set: body })

      return { status: 'success', message: 'Product has been updated successfully.' }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async deleteById (productId) {
    try {
      if (!productId) throw new Error('Missing \'productId\' parameter!')

      const product = await productsModel.findById(productId)
      if (!product) throw new Error('Non-existent product.')

      await ProductModel.findByIdAndDelete(productId)
      super.deleteFileFromServer(product)

      return { status: 'success', message: 'Product has been deleted successfully.' }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }
}
