import FirebaseContainer from '../../contenedores/ContenedorFirebase.js'

export default class CartsFirebase extends FirebaseContainer {
  constructor () {
    super()
    this.cartsRef = this.db.collection('carts')
    this.productsRef = this.db.collection('products')
  }

  async createCart () {
    try {
      const cart = await this.cartsRef.add({ products: [] })
      return { status: 'success', message: `Cart with ID ${cart.id} has been created successfully.` }
    } catch (err) {
      console.log(`${err}`)
      return { status: 'error', message: err.message }
    }
  }

  async addProductToCart (cartId, productId) {
    try {
      if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')

      const cartDoc = await this.cartsRef.doc(cartId).get()
      const cart = cartDoc.data()
      if (!cart) throw new Error('Non-existent cart.')

      const productDoc = await this.productsRef.doc(productId).get()
      const product = productDoc.data()
      if (!product) throw new Error('Non-existent product.')
      product.id = productId

      const found = cart.products.find(p => p.id === productId)
      if (found) throw new Error('Product has already been added.')

      const products = [
        ...cart.products,
        product
      ]

      await this.cartsRef.doc(cartId).set({ products: products })
      return { status: 'success', message: 'Product has been added successfully.' }
    } catch (err) {
      console.log(`Cart add error: ${err.message}`)
      return { status: 'error', message: err.message }
    }
  }

  async getProductsByCartId (cartId) {
    try {
      if (!cartId) throw new Error('Missing \'id\' parameter!')

      const document = await this.cartsRef.doc(cartId).get()
      const cart = document.data()
      if (!cart) throw new Error('Non-existent cart.')

      const products = cart.products

      return { status: 'success', payload: products }
    } catch (err) {
      console.log(`Cart get error: ${err.message}`)
      return { status: 'error', message: err.message }
    }
  }

  async deleteProductFromCart (cartId, productId) {
    try {
      if (!cartId || !productId) throw new Error('Missing \'cartId\' or \'productId\' parameter!')

      const cartDoc = await this.cartsRef.doc(cartId).get()
      const cart = cartDoc.data()
      if (!cart) throw new Error('Non-existent cart.')

      const productDoc = await this.productsRef.doc(productId).get()
      const product = productDoc.data()
      if (!product) throw new Error('Non-existent product.')

      const products = cart.products.filter(p => p.id !== productId)

      await this.cartsRef.doc(cartId).set({ products: products })
      return { status: 'success', payload: 'Product has been deleted successfully.' }
    } catch (err) {
      console.log(`Product add error: ${err.message}`)
      return { status: 'error', message: err.message }
    }
  }

  async deleteCartById (cartId) {
    try {
      if (!cartId) throw new Error('Missing \'cartId\' parameter!')

      const document = this.cartsRef.doc(cartId)
      const cartObject = await document.get()
      const cart = cartObject.data()
      if (!cart) throw new Error('Non-existent cart.')

      await document.delete()

      return { status: 'success', message: 'Cart has been deleted successfully.' }
    } catch (err) {
      console.log(`Delete cart error: ${err.message}`)
      return { status: 'error', message: err.message }
    }
  }
}