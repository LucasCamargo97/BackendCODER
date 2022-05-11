import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import User from '../models/User.js'

export default class CartService {
  async getCart (cartId) {
    if (!cartId) throw new Error('Missing \'cartId\' parameter!')

    const cartFound = await Cart.findById(cartId).populate('products.product')
    if (!cartFound) throw new Error('Cart not found.')

    return cartFound
  }

  async getCarts () {
    return await Cart.find().populate('products.product')
  }

  async createCart (userId) {
    if (!userId) throw new Error('Missing \'userId\' parameter!')

    const userFound = await User.findById(userId)
    if (!userFound) throw new Error('User not found.')

    const cartCreated = await Cart.create({ products: [], user: userFound._id })

    userFound.cart = cartCreated._id
    userFound.save()

    return cartCreated
  }

  async addProduct (cartId, productId, quantity) {
    if (!cartId || !productId || !quantity) throw new Error('Missing \'cartId\', \'productId\' or \'quantity\' parameter!')

    let quantityChanged = false

    const cart = await Cart.findById(cartId)
    if (!cart) throw new Error('Non-existent cart.')

    const product = await Product.findById(productId)
    if (!product) throw new Error('Non-existent product.')

    if (product.stock === 0) throw new Error('Product out of stock.')

    if (product.stock < quantity) {
      quantity = product.stock
      quantityChanged = true
    }

    product.stock = product.stock - quantity
    if (product.stock === 0) { product.status = 'unavailable' }

    const productFound = await Cart.findById(cartId).findOne({ 'products.product': productId })
    if (productFound) throw new Error('Product already exists in cart.')

    await Cart.findByIdAndUpdate(cartId, { $push: { products: { product: product, quantity: quantity } } })
    return { quantityChanged, quantity }
  }

  async getProducts (cartId) {
    if (!cartId) throw new Error('Missing \'cartId\' parameter!')

    const cart = await Cart.findById(cartId).populate('products.product')
    if (!cart) throw new Error('Non-existent cart.')

    const products = cart.products
    return products
  }

  async deleteProduct (cartId, productId) {
    if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')

    const cart = await Cart.findById(cartId)
    if (!cart) throw new Error('Non-existent cart.')

    if (cart.products.some(element => element.product._id.toString() === productId)) {
      const product = await Product.findById(productId)
      if (!product) throw new Error('Non-existent product.')

      const productInCart = cart.products.find(element => element.product._id.toString() === productId)
      product.stock = product.stock + productInCart.quantity

      await Product.findByIdAndUpdate(productId, product)

      cart.products = cart.products.filter(element => element.product._id.toString() !== productId)
      await Cart.findByIdAndUpdate(cartId, cart)
    } else {
      throw new Error('Product not found in the cart.')
    }
  }

  async updateCart (cartId, products) {
    if (!cartId || !products) throw new Error('Missing \'cartId\' or \'products\' parameter!')

    let stockLimitation = false

    const cart = await Cart.findById({ _id: cartId })
    if (!cart) throw new Error('Cart not found.')

    for (const element of cart.products) {
      const product = await Product.findById({ _id: element.product })
      const associatedProductInCart = cart.products.find(element => element.product.toString() === product._id.toString())
      const associatedProductInInput = products.find(element => element.product.toString() === product._id.toString())
      if (associatedProductInCart.quantity !== associatedProductInInput.quantity) {
        if (associatedProductInCart.quantity > associatedProductInInput.quantity) {
          const difference = associatedProductInCart.quantity - associatedProductInInput.quantity
          associatedProductInCart.quantity = associatedProductInInput.quantity
          product.stock += difference
          await Product.findByIdAndUpdate(product._id, product)
        } else {
          const difference = associatedProductInInput.quantity - associatedProductInCart.quantity
          if (product.stock >= difference) {
            product.stock -= difference
            await Product.findByIdAndUpdate(product._id, product)
            associatedProductInCart.quantity = associatedProductInInput.quantity
          } else {
            stockLimitation = true
            associatedProductInCart.quantity += product.stock
            product.stock = 0
            await Product.findByIdAndUpdate(product._id, product)
          }
        }
      } else {
        console.log('La cantidad para este producto no cambió.')
      }
    }
    await Cart.findByIdAndUpdate(cartId, cart)
    return { stockLimitation }
  }

  async deleteCart (cartId) {
    if (!cartId) throw new Error('Missing \'cartId\' parameter!')

    const cart = await Cart.findById(cartId)
    if (!cart) throw new Error('Non-existent cart.')

    const userFound = await User.findById(cart.user)
    if (!userFound) throw new Error('User not found.')

    userFound.cart = undefined
    userFound.save()

    await Cart.findByIdAndDelete(cartId)
  }

  async confirmPurchase (cartId) {
    if (!cartId) throw new Error('Missing \'cartId\' parameter!')

    const cart = await Cart.findById(cartId)
    if (!cart) throw new Error('Non-existent cart.')

    cart.products.forEach(async item => {
      const productFound = await Product.findById(item.product._id)
      if (!productFound) throw new Error(`Product ${productFound.name} not found.`)

      productFound.stock = productFound.stock - item.quantity
      productFound.save()
    })

    cart.products = []
    await Cart.findByIdAndUpdate(cartId, cart)
  }
}
