import fs from 'fs'
import __dirname from '../utils.js'
const cartURL = __dirname+'/files/carts.json'
const productURL = __dirname+'/files/products.json'

class Cart {
  async create () {
    try {
      const cartFile = await fs.promises.readFile(cartURL, 'utf-8')
      let carts = []
      const cart = {
        id: 1,
        timestamp: Date.now(),
        products: []
      }

      if (cartFile) {
        carts = JSON.parse(cartFile)
        const ids = carts.map(c => c.id)
        const maxId = Math.max(...ids)
        cart.id = maxId + 1
      }

      carts = [...carts, cart]

      await fs.promises.writeFile(cartURL, JSON.stringify(carts, null, 2))
      return { status: 'success', message: `Cart has been created successfully with id: ${cart.id}` }
    } catch (err) {
      console.log(`Create cart error: ${err.message}`)
      return { status: 'error', message: 'Create cart error.' }
    }
  }

  async deleteCartById (cartId) {
    try {
      if (!cartId) throw new Error('Missing \'id\' parameter!')
      const fileCart = await fs.promises.readFile(cartURL, 'utf-8')
      const carts = JSON.parse(fileCart)

      const cartIdFound = carts.find(c => c.id === cartId)
      if (!cartIdFound) throw new Error(`CartId '${cartId}' not found.`)

      const cart = carts.filter(c => c.id !== cartId)

      await fs.promises.writeFile(cartURL, JSON.stringify(cart, null, 2))
      return { status: 'success', message: 'Cart has been deleted successfully.' }
    } catch (err) {
      console.log(`Delete cart error: ${err.message}`)
      return { status: 'error', message: 'Delete cart error.' }
    }
  }

  async getAll (cartId) {
    try {
      if (!cartId) throw new Error('Missing \'id\' parameter!')
      const fileCart = await fs.promises.readFile(cartURL, 'utf-8')
      if (!fileCart) throw new Error('The document is empty!')
      const products = JSON.parse(fileCart).find(c => c.id === cartId).products
      return { status: 'success', payload: products }
    } catch (err) {
      console.log(`Read products cart error: ${err.message}`)
      return { status: 'error', message: err.message }
    }
  }

  async addProduct (cartId, productId) {
    try {
      if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')
      const productsFile = await fs.promises.readFile(productURL, 'utf-8')
      if (!productsFile) throw new Error('The document is empty!')
      const products = JSON.parse(productsFile)
      const product = products.find(p => p.id === productId)

      const cartsFile = await fs.promises.readFile(cartURL, 'utf-8')
      if (!cartsFile) throw new Error('The document is empty!')
      const aux = JSON.parse(cartsFile)
      let carts = JSON.parse(cartsFile).filter(c => c.id !== cartId)
      const cart = aux.find(c => c.id === cartId)
      cart.products = [
        ...cart.products,
        product
      ]

      carts = [
        ...carts,
        cart
      ]

      await fs.promises.writeFile(cartURL, JSON.stringify(carts, null, 2))
      return { status: 'success', payload: 'Product has been added successfully.' }
    } catch (err) {
      console.log(`Product add error: ${err.message}`)
      return { status: 'error', message: 'Product add error.' }
    }
  }

  async deleteProduct (cartId, productId) {
    try {
      if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')
      const cartsFile = await fs.promises.readFile(cartURL, 'utf-8')
      if (!cartsFile) throw new Error('The document is empty!')
      const products = JSON.parse(cartsFile).find(c => c.id === cartId).products.filter(p => p.id !== productId)

      let carts = JSON.parse(cartsFile).filter(c => c.id !== cartId)
      const cart = JSON.parse(cartsFile).find(c => c.id === cartId)
      cart.products = products

      carts = [
        ...carts,
        cart
      ]

      await fs.promises.writeFile(cartURL, JSON.stringify(carts, null, 2))
      return { status: 'success', payload: 'Product has been deleted successfully.' }
    } catch (err) {
      console.log(`Product add error: ${err.message}`)
      return { status: 'error', message: 'Product add error.' }
    }
  }
}

export default Cart