import { Router } from 'express'
import { updateCart, fetchCarts, createCart, addProduct, fetchProducts, deleteProduct, deleteCart, fetchCart, confirmPurchase } from '../controllers/cartController.js'
const cartRouter = Router()

cartRouter.post('/purchase/:cartId', confirmPurchase)
cartRouter.get('/:cartId', fetchCart)
cartRouter.put('/:cartId/', updateCart)
cartRouter.post('/:cartId/products/:productId', addProduct)
cartRouter.delete('/:cartId/products/:productId', deleteProduct)

cartRouter.get('/', fetchCarts)
cartRouter.post('/', createCart)
cartRouter.get('/:cartId/products', fetchProducts)
cartRouter.delete('/:cartId', deleteCart)

export default cartRouter
