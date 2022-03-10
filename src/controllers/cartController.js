import loggerHandler from '../middlewares/loggerHandler.js'
import CartService from '../services/cartService.js'
const service = new CartService()
const logger = loggerHandler()

export const fetchCart = (req, res) => {
  const { cartId } = req.params
  service.getCart(cartId)
    .then(cart => {
      res.json({ cart })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const fetchCarts = (req, res) => {
  service.getCarts()
    .then(carts => {
      res.json({ carts })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const createCart = (req, res) => {
  const { userId } = req.body
  service.createCart(userId)
    .then(cart => {
      res.json({ cart })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const addProduct = async (req, res) => {
  const cartId = req.params.cartId
  const productId = req.params.productId
  service.addProduct(cartId, productId)
    .then(() => {
      res.json({ message: 'Product has been added successfully.' })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const fetchProducts = async (req, res) => {
  const cartId = req.params.cartId
  service.getProducts(cartId)
    .then(products => {
      res.json({ products })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const deleteProduct = async (req, res) => {
  const cartId = req.params.cartId
  const productId = req.params.productId
  service.deleteProduct(cartId, productId)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const deleteCart = async (req, res) => {
  const cartId = req.params.cartId
  service.deleteCart(cartId)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}
