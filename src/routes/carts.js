import express from 'express'
import CartsFile from '../daos/carts/CarritosDaoArchivos.js'
import CartsMongoDB from '../daos/carts/CarritosDaoMongoDB.js'
import CartsFirebase from '../daos/carts/CarritosDaoFirebase.js'
import { TECHNOLOGY } from '../config.js'

let cartsService

switch (TECHNOLOGY) {
  case 'file':
    cartsService = new CartsFile()
    break
  case 'mongodb':
    cartsService = new CartsMongoDB()
    break
  case 'firebase':
    cartsService = new CartsFirebase()
    break
  default:
    cartsService = new CartsFile()
    break
}

const cartRouter = express.Router()

cartRouter.post('/', (req, res) => {
  cartsService.createCart().then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

cartRouter.delete('/:id', (req, res) => {
  const cartId = req.params.id
  cartsService.deleteCartById(cartId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

cartRouter.get('/:id/products', (req, res) => {
  const cartId = req.params.id
  cartsService.getProductsByCartId(cartId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

cartRouter.post('/:id/products/:productId', (req, res) => {
  const cartId = req.params.id
  const productId = req.params.productId
  cartsService.addProductToCart(cartId, productId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

cartRouter.delete('/:id/products/:productId', (req, res) => {
  const cartId = req.params.id
  const productId = req.params.productId
  cartsService.deleteProductFromCart(cartId, productId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

export default cartRouter