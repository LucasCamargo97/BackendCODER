import FirebaseContainer from '../../contenedores/ContenedorFirebase.js'

export default class ProductsFirebase extends FirebaseContainer {
  constructor () {
    super()
    this.productsRef = this.db.collection('products')
  }

  async getAll () {
    try {
      const documents = await this.productsRef.get()
      const products = documents.docs.map(p => {
        const product = p.data()
        product.id = p.id
        return product
      })
      return { status: 'success', payload: products }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async getById (productId) {
    try {
      if (!productId) throw new Error('Missing \'productId\' parameter!')

      const document = await this.productsRef.doc(productId).get()
      const product = document.data()
      if (!product) throw new Error('Non-existent product.')

      product.id = document.id

      return { status: 'success', payload: product }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async createProduct (product) {
    try {
      if (Object.keys(body).length === 0) throw new Error('Missing or empty \'body product\' parameter!')
      if (!body.title || !body.description || !body.code || !body.thumbnail || !body.price || !body.stock ) throw new Error('Body product parameter is badly formed.')

      const hasProduct = await this.productsRef.where('title', '==', body.title).get()
      if (!hasProduct.empty) throw new Error('Product already exists.')

      body.stock = parseInt(body.stock)
      body.price = parseInt(body.price)

      const created = await this.productsRef.add(body)

      return { status: 'success', message: `Product with ID ${created.id} has been created successfully.` }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async updateProduct (productId, body) {
    try {
      if (!productId || Object.keys(body).length === 0) throw new Error('Missing or empty \'productId\' or \'body product\' parameter!')
      if (!body.title || !body.description || !body.code || !body.thumbnail || !body.price || !body.stock) throw new Error('Body product parameter is badly formed.')

      const document = this.productsRef.doc(productId)
      const result = await document.get()
      const product = result.data()
      if (!product) throw new Error('Non-existent product.')

      body.stock = parseInt(body.stock)
      body.price = parseInt(body.price)

      await document.update(body)

      return { status: 'success', message: 'Product has been updated successfully.' }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }

  async deleteById (productId) {
    try {
      if (!productId) throw new Error('Missing \'productId\' parameter!')

      const document = this.productsRef.doc(productId)
      const result = await document.get()
      const product = result.data()
      if (!product) throw new Error('Non-existent product.')

      await document.delete()
      super.deleteFileFromServer(product)

      return { status: 'success', message: 'Product has been deleted successfully.' }
    } catch (err) {
      console.error(err)
      return { status: 'error', message: err.message }
    }
  }
}
