import fs from 'fs'
import { __dirname } from '../utils.js'
import Product from '../models/Product.js'

export default class ProductService {
  async getProducts () {
    return await Product.find()
  }

  async getProductById (productId) {
    if (!productId) throw new Error('Missing \'productId\' parameter!')

    const product = await Product.findById(productId)
    if (!product) throw new Error('Non-existent product.')

    return product
  }

  async createProduct (title, description, code, thumbnail, price, stock) {
    if (!title || !description || !code || !thumbnail || !price || !stock) throw new Error('Body product is badly formed.')

    const product = await Product.findOne({ title: { $eq: title } })
    if (product) throw new Error('Product already exists.')

    stock = parseInt(stock)
    price = parseInt(price)

    await Product.create({ title, description, code, thumbnail, price, stock })
  }

  async updateProductById (productId, body) {
    if (!productId || Object.keys(body).length === 0) throw new Error('Missing or empty \'productId\' or \'body\' product.')

    const product = await Product.findById(productId)
    if (!product) throw new Error('Non-existent product.')

    const productFound = await Product.findOne({ _id: { $ne: productId }, title: { $eq: body.title } })
    if (productFound) throw new Error('Product already exists.')

    body.stock = parseInt(body.stock)
    body.price = parseInt(body.price)

    await Product.findByIdAndUpdate(productId, body, { new: true })
  }

  async deleteProductById (productId) {
    if (!productId) throw new Error('Missing \'productId\' parameter!')

    const product = await Product.findById(productId)
    if (!product) throw new Error('Non-existent product.')

    await Product.findByIdAndDelete(productId)
    this.deleteFileFromServer(product)
  }

  async deleteFileFromServer (product) {
    try {
      if (!product) throw new Error('Missing \'product\' parameter')
      const thumbnail = product.thumbnail
      const index = thumbnail.lastIndexOf('/') + 1
      const thumbnailName = thumbnail.substring(index, thumbnail.length)
      await fs.promises.unlink(__dirname + '/uploads/' + thumbnailName)
      console.log(`Thumbnail ${thumbnailName} has been deleted successfully from server.`)
    } catch (err) {
      console.error(err)
    }
  }
}
