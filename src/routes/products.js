import express from 'express'
import upload from '../services/upload.js'
import { authMiddleware } from '../utils.js'
import ProductsFile from '../daos/products/ProductosDaoArchivos.js'
import ProductsMongoDB from '../daos/products/ProductosDaoMongoDB.js'
import ProductsFirebase from '../daos/products/ProductosDaoFirebase.js'
import { TECHNOLOGY } from '../config.js'

let productsService

switch (TECHNOLOGY) {
  case 'file':
    productsService = new ProductsFile()
    break
  case 'mongodb':
    productsService = new ProductsMongoDB()
    break
  case 'firebase':
    productsService = new ProductsFirebase()
    break
  default:
    productsService = new ProductsFile()
    break
}

const productsRouter = express.Router()

productsRouter.get('/', (req, res) => {
  productsService.getAll()
    .then(result => {
      if (result.status === 'success') return res.status(200).json(result)
      else return res.status(500).json(result)
    })
})

productsRouter.get('/:id', (req, res) => {
  const productId = req.params.id
  productsService.getById(productId)
    .then(result => {
      if (result.status === 'success') return res.status(200).json(result)
      else return res.status(500).json(result)
    })
})

productsRouter.post('/', authMiddleware, upload.single('picture'), (req, res) => {
  const file = req.file
  const product = req.body
  productsService.createProduct(product)
    .then(result => {
      if (result.status === 'success') return res.status(200).json(result)
      else return res.status(500).json(result)
    })
})

productsRouter.put('/:id', authMiddleware, (req, res) => {
  const productId = req.params.id
  const product = req.body
  productsService.updateProduct(productId, product)
    .then(result => {
      if (result.status === 'success') return res.status(200).json(result)
      else return res.status(500).json(result)
    })
})

productsRouter.delete('/:id', authMiddleware, (req, res) => {
  const productId = req.params.id
  productsService.deleteById(productId)
    .then(result => {
      if (result.status === 'success') return res.status(200).json(result)
      else return res.status(500).json(result)
    })
})

export default productsRouter