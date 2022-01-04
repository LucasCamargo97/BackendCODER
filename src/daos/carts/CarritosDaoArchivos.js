import Contenedor from '../../contenedores/ContenedorArchivo.js'
import { __dirname } from '../../utils.js'
import fs from 'fs'

class CartsFile extends Contenedor {
  constructor () {
    super(__dirname + '/daos/db/carts.json')
  }

  async createCart () {
    try {
      const cartsFile = await fs.promises.readFile(this.URL, 'utf-8')
      let carts = cartsFile ? JSON.parse(cartsFile) : []
      const cart = {
        id: 1,
        timestamp: Date.now(),
        products: []
      }

      if (carts.length > 0) {
        const ids = carts.map(c => c.id)
        const maxId = Math.max(...ids)
        cart.id = maxId + 1
      }

      carts = [...carts, cart]

      await fs.promises.writeFile(this.URL, JSON.stringify(carts, null, 2))
      return { status: 'success', message: `Cart has been created successfully with ID ${cart.id}` }
    } catch (err) {
      console.log(`Create cart error: ${err.message}`)
      return { status: 'error', message: 'Create cart error.' }
    }
  }

  async deleteCartById (cartId) {
    try {
      if (!cartId) throw new Error('Missing \'id\' parameter!')
      cartId = parseInt(cartId)

      const cartsFile = await fs.promises.readFile(this.URL, 'utf-8')
      let carts = cartsFile ? JSON.parse(cartsFile) : []

      const cart = carts.find(c => c.id === cartId)
      if (!cart) throw new Error('Non-existent cart.')

      carts = carts.filter(c => c.id !== cartId)

      await fs.promises.writeFile(this.URL, JSON.stringify(carts, null, 2))

      return { status: 'success', message: 'Cart has been deleted successfully.' }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async getProductsByCartId (cartId) {
    try {
      if (!cartId) throw new Error('Missing \'cartId\' parameter!')
      cartId = parseInt(cartId)

      const cartsFile = await fs.promises.readFile(this.URL, 'utf-8')
      const carts = cartsFile ? JSON.parse(cartsFile) : []

      const cart = carts.find(c => c.id === cartId)
      if (!cart) throw new Error('Non-existent cart.')

      const products = cart.products

      return { status: 'success', payload: products }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }


  async addProductToCart (cartId, productId) {
    try {
      if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')
      cartId = parseInt(cartId)
      productId = parseInt(productId)

      const cartsFile = await fs.promises.readFile(this.URL, 'utf-8')
      let carts = cartsFile ? JSON.parse(cartsFile) : []

      const cart = carts.find(c => c.id === cartId)
      if (!cart) throw new Error('Non-existent cart.')

      const productsFile = await fs.promises.readFile(__dirname + '/daos/db/products.json', 'utf-8')
      const products = productsFile ? JSON.parse(productsFile) : []

      const product = products.find(p => p.id === productId)
      if (!product) throw new Error('Non-existent product.')

      carts = carts.filter(c => c.id !== cartId)
      const productFound = cart.products.find(p => p.id === productId)
      if (productFound) throw new Error('Product already exists in cart.')

      cart.products = [...cart.products, product]
      carts = [...carts, cart]

      await fs.promises.writeFile(this.URL, JSON.stringify(carts, null, 2))

      return { status: 'success', payload: 'Product has been added successfully.' }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async deleteProductFromCart (cartId, productId) {
    try {
      if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')
      cartId = parseInt(cartId)
      productId = parseInt(productId)

      const cartsFile = await fs.promises.readFile(this.URL, 'utf-8')
      let carts = cartsFile ? JSON.parse(cartsFile) : []

      const cart = carts.find(c => c.id === cartId)
      if (!cart) throw new Error('Non-existent cart.')

      const product = cart.products.find(p => p.id === productId)
      if (!product) throw new Error('Non-existent product in cart.')

      const products = cart.products.filter(p => p.id !== productId)

      carts = carts.filter(c => c.id !== cartId)
      cart.products = products

      carts = [...carts, cart]

      await fs.promises.writeFile(this.URL, JSON.stringify(carts, null, 2))

      return { status: 'success', message: 'Product has been deleted successfully.' }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }
}

export default CartsFile
