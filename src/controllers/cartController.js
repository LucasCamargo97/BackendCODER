import loggerHandler from '../middlewares/loggerHandler.js'
import CartService from '../services/cartService.js'
const service = new CartService()
const logger = loggerHandler()

export const fetchCart = (req, res) => {
  const { cartId } = req.params
  service.getCart(cartId)
    .then(cart => {
      res.json({ status: 'success', payload: cart })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const fetchCarts = (req, res) => {
  service.getCarts()
    .then(carts => {
      res.json({ carts })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const createCart = (req, res) => {
  const { userId } = req.body
  service.createCart(userId)
    .then(cart => {
      res.json({ cart })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const addProduct = async (req, res) => {
  const cartId = req.params.cartId
  const productId = req.params.productId
  const { quantity } = req.body
  service.addProduct(cartId, productId, quantity)
    .then(result => {
      res.json({ status: 'success', quantityChanged: result.quantityChanged, newQuantity: result.quantity, message: 'Product has been added successfully.' })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const fetchProducts = async (req, res) => {
  const cartId = req.params.cartId
  service.getProducts(cartId)
    .then(products => {
      res.json({ products })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const deleteProduct = async (req, res) => {
  const cartId = req.params.cartId
  const productId = req.params.productId
  service.deleteProduct(cartId, productId)
    .then(() => {
      res.send({ status: 'success', message: 'Product deleted' })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const deleteCart = async (req, res) => {
  const cartId = req.params.cartId
  service.deleteCart(cartId)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const updateCart = async (req, res) => {
  const { cartId } = req.params
  const { products } = req.body
  service.updateCart(cartId, products)
    .then(result => {
      res.send({ status: 'success', stockLimitation: result.stockLimitation })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(400).json({ message: err.message })
    })
}

export const confirmPurchase = async (req, res) => {
  const { cartId } = req.params
  service.confirmPurchase(cartId)
    .then(() => {
      res.send({ status: 'success', message: 'Finished purchase!' })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).json({ message: err.message })
    })
}
