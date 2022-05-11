import ProductService from '../services/productService.js'
import { PORT } from '../config/config.js'
import loggerHandler from '../middlewares/loggerHandler.js'
const service = new ProductService()
const logger = loggerHandler()

export const createProduct = async (req, res) => {
  const { file } = req
  const { title, description, code, price, stock } = req.body
  let thumbnail = ''
  if (file) {
    thumbnail = `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`
  }
  service.createProduct(title, description, code, thumbnail, price, stock)
    .then(() => {
      res.json({ status: 'success', message: 'Product added' })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const getProducts = async (req, res) => {
  service.getProducts()
    .then(products => {
      res.json({ status: 'success', payload: products })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const getProduct = async (req, res) => {
  const productId = req.params.id
  service.getProductById(productId)
    .then(product => {
      res.json({ status: 'success', payload: product })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const updateProduct = async (req, res) => {
  const productId = req.params.id
  const file = req.file
  const product = req.body
  if (file) {
    product.thumbnail = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`
  }
  service.updateProductById(productId, product)
    .then(() => {
      res.json({ status: 'success', message: 'Product updated' })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const deleteProduct = async (req, res) => {
  const productId = req.params.id
  service.deleteProductById(productId)
    .then(() => {
      res.send({ status: 'success', message: 'Product deleted' })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}
