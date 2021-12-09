import express from 'express'
import Cart from '../classes/Cart.js'
const carts = new Cart()
const cartRouter = express.Router()

//----------------GET-------------------------

cartRouter.get('/api/cart/:id/products', (req, res) => {
  const id = Number(req.params.id)
  carts.getAll(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

//----------------POST-------------------------

cartRouter.post('/api/cart', (req, res) => {
  carts.create().then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

cartRouter.post('/api/cart/:id/products/:productId', (req, res) => {
  const cartId = Number(req.params.id)
  const productId = Number(req.params.productId)
  carts.addProduct(cartId, productId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

//-----------------DELETE----------------------
cartRouter.delete('/api/cart/:id', (req, res) => {
  const id = Number(req.params.id)
  carts.deleteCartById(id).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

cartRouter.delete('/api/cart/:id/products/:productId', (req, res) => {
  const cartId = Number(req.params.id)
  const productId = Number(req.params.productId)
  carts.deleteProduct(cartId, productId).then(result => {
    if (result.status === 'success') res.status(200).json(result)
    else res.status(500).send(result)
  })
})

export default cartRouter
