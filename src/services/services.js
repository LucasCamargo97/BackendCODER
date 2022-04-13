import MongoDAO from '../models/MongoDAO.js'
import UserService from './userService.js'
import ProductService from './productService.js'
import CartService from './cartService.js'
import { PERSISTENCE, MONGO } from '../config/config.js'

let dao

switch (PERSISTENCE) {
  case 'MONGO':
    dao = new MongoDAO(MONGO.URI)
    break
}

export const userService = new UserService(dao)
export const productService = new ProductService(dao)
export const cartService = new CartService(dao)
