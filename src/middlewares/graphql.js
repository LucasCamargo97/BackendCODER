import { buildSchema } from 'graphql'
import { cartService, productService, userService } from '../services/services.js'
import UserDTO from '../dto/UserDTO.js'
import ProductDTO from '../dto/ProductDTO.js'
import CartDTO from '../dto/CartDTO.js'

export const graphqlSchema = buildSchema(`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    username: String!
    phone: String!
    address: String!
    age: Int!
    avatar: String
    role: String
  }

  type Product {
    id: String!
    name: String!
    description: String!
    category: String!
    code: String!
    price: Int!
    stock: Int!
    picture: String!
  }

  type Cart {
    id: String!
    products: [String]!
    user: String!
  }

  type Query {
    users: [User]
    userById(id: String!): User

    products: [Product]
    productById(id: String!): Product

    carts: [Cart]
    cartById(id: String!): Cart
    productsCart(id: String!): [String]
  }

  type Mutation {
    createUser(firstName: String, lastName: String, email: String, password: String, username: String, phone: String, address: String, age: Int, role: String): User
    updateUser(id: String!, firstName: String, lastName: String, email: String, password: String, username: String, phone: String, address: String, age: Int, role: String): User
    deleteUser(id: String!): String

    createProduct(name: String, description: String, category: String, code: String, price: Int, stock: Int, picture: String): Product
    updateProduct(id: String!, name: String, description: String, category: String, code: String, price: Int, stock: Int, picture: String): Product
    deleteProduct(id: String!): String

    createCart(user: String): Cart
    addProductToCart(id: String!, productId: String!): String
    deleteProductFromCart(id: String!, productId: String!): String
    deleteCart(id: String!): String
  }
`)

export const graphqlResolvers = {
  users: async () => {
    const users = await userService.get()
    const userDTOs = users.map(user => new UserDTO(user))
    return userDTOs
  },
  userById: async (data) => {
    const user = await userService.getOne({ _id: data.id })
    if (!user) throw new Error('Non-existent user.')

    return new UserDTO(user)
  },
  createUser: async ({ firstName, lastName, email, password, username, phone, address, age }) => {
    const userFound = await userService.getOne({ email })
    if (userFound) throw new Error('User already exists.')

    const document = {
      firstName,
      lastName,
      email,
      password: await userService.encryptPassword(password),
      username,
      phone,
      address,
      age: parseInt(age),
      role: 'user'
    }

    const user = await userService.add(document)
    return new UserDTO(user)
  },
  updateUser: async ({ id, firstName, lastName, email, password, username, phone, address, age }) => {
    const user = await userService.getOne({ _id: id })
    if (!user) throw new Error('Non-existent user.')

    const document = {
      firstName,
      lastName,
      email,
      password: await userService.encryptPassword(password),
      username,
      phone,
      address,
      age: parseInt(age),
      role: 'user'
    }

    const updatedUser = await userService.update(id, document)
    return new UserDTO(updatedUser)
  },
  deleteUser: async ({ id }) => {
    const user = await userService.getOne({ _id: id })
    if (!user) throw new Error('Non-existent user.')

    await userService.delete({ _id: id })
    return 'User deleted.'
  },
  products: async () => {
    const products = await productService.get()
    const productDTOs = products.map(product => new ProductDTO(product))
    return productDTOs
  },
  productById: async (data) => {
    const product = await productService.getOne({ _id: data.id })
    if (!product) throw new Error('Non-existent product.')

    return new ProductDTO(product)
  },
  createProduct: async ({ name, category, description, code, price, stock, picture }) => {
    const productFound = await productService.getOne({ name })
    if (productFound) throw new Error('Product already exists.')

    const document = {
      name,
      category,
      description,
      code,
      price: parseInt(price),
      stock: parseInt(stock),
      picture
    }

    const product = await productService.add(document)
    return new ProductDTO(product)
  },
  updateProduct: async ({ id, name, category, description, code, price, stock, picture }) => {
    const productNotFound = await productService.getOne({ _id: id })
    if (!productNotFound) throw new Error('Non-existent product.')

    const productFound = await productService.getOne({ _id: { $ne: id }, name: { $eq: name } })
    if (productFound) throw new Error('Product already exists.')

    const document = {
      name,
      category,
      description,
      code,
      price: parseInt(price),
      stock: parseInt(stock),
      picture
    }

    const product = await productService.update(id, document)
    return new ProductDTO(product)
  },
  deleteProduct: async ({ id }) => {
    const product = await productService.getOne({ _id: id })
    if (!product) throw new Error('Non-existent product.')

    await productService.delete({ _id: id })
    return 'Product deleted.'
  },
  createCart: async ({ user }) => {
    const userFound = await userService.getOne({ _id: user })
    if (!userFound) throw new Error('Non-existent user.')

    const cartFound = await cartService.getOne({ user })
    if (cartFound) throw new Error('Cart already exists for this user.')

    const cart = await cartService.createCart(user)
    return new CartDTO(cart)
  },
  carts: async () => {
    const carts = await cartService.get()
    const cartDTOs = carts.map(cart => new CartDTO(cart))
    return cartDTOs
  },
  cartById: async ({ id }) => {
    const cart = await cartService.getOne({ _id: id })
    if (!cart) throw new Error('Non-existent cart.')

    return new CartDTO(cart)
  },
  addProductToCart: async ({ cartId, productId }) => {
    const cart = await cartService.getOne({ _id: cartId })
    if (!cart) throw new Error('Non-existent cart.')

    const product = await productService.getOne({ _id: productId })
    if (!product) throw new Error('Non-existent product.')

    await cartService.update(cartId, { $push: { products: product } })
    return 'Product has been added successfully.'
  },
  deleteProductFromCart: async ({ id, productId }) => {
    const cart = await cartService.getOne({ _id: id })
    if (!cart) throw new Error('Non-existent cart.')

    const product = cart.products.find(id => id.toString() === productId)
    if (!product) throw new Error('Non-existent product in cart.')

    await cartService.update(id, { $pull: { products: productId } })
    return 'Product deleted from cart.'
  },
  deleteCart: async ({ id }) => {
    await cartService.delete(id)
    return 'Cart deleted.'
  }

}
