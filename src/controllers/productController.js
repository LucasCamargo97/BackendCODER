import ProductService from '../services/productService.js'
import { PORT } from '../config/config.js'
import loggerHandler from '../middlewares/loggerHandler.js'
const service = new ProductService()
const logger = loggerHandler()

export const createProduct = async (req, res) => {
  const { file } = req
  const { name, category, description, code, price, stock } = req.body
  let picture = ''
  if (file) {
    picture = `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`
  }
  service.createProduct(name, category, description, code, picture, price, stock)
    .then(product => {
      res.json({ product })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const getProducts = async (req, res) => {
  service.getProducts()
    .then(products => {
      res.json({ products })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const getProduct = async (req, res) => {
  const productId = req.params.id
  service.getProductById(productId)
    .then(product => {
      res.json({ product })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const updateProduct = async (req, res) => {
  const productId = req.params.id
  const file = req.file
  const product = req.body
  if (file) {
    product.picture = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${file.filename}`
  }
  service.updateProductById(productId, product)
    .then(product => {
      res.json({ product })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const deleteProduct = async (req, res) => {
  const productId = req.params.id
  service.deleteProductById(productId)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}
