import Role, { ROLES } from '../models/Role.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
import { MAILER_AUTH, PORT } from '../../config/config.js'
import loggerHandler from '../../middlewares/loggerHandler.js'
import Category from '../models/Category.js'

const logger = loggerHandler()

const initDatabase = async () => {
  try {
    await createCategories()
    await createProducts()
    await createRoles()
    await createUsers()
  } catch (err) {
    logger.error(err.message)
  }
}

const createCategories = async () => {
  const count = await Category.estimatedDocumentCount()
  if (count > 0) return

  await Promise.all([
    new Category({ name: 'Calzado' }).save(),
    new Category({ name: 'Pelotas' }).save()
  ])

  logger.info('Categories has been initialized successfuly.')
}

const createRoles = async () => {
  const count = await Role.estimatedDocumentCount()
  if (count > 0) return

  await Promise.all([
    new Role({ name: ROLES.ADMINISTRATOR }).save(),
    new Role({ name: ROLES.USER }).save()
  ])

  logger.info('Roles has been initialized successfuly.')
}

const createUsers = async () => {
  const count = await User.estimatedDocumentCount()
  if (count > 0) return

  new User({
    firstName: 'Lucas',
    lastName: 'Camargo',
    email: MAILER_AUTH.USER,
    password: await User.encryptPassword('abc123'),
    username: 'lucascam',
    phone: '+59894916015',
    address: 'Garibaldi 5438',
    age: 24,
    role: await Role.findOne({ name: ROLES.ADMINISTRATOR }),
    avatar: `http://localhost:${PORT}/uploads/Uj5hg78UH7yd3JS34hEN8u.png`
  }).save()

  logger.info('Users has been initialized successfuly.')
}

const createProducts = async () => {
  const count = await Product.estimatedDocumentCount()
  if (count > 0) return

  await Promise.all([
    new Product({
      name: 'Nike Mercurial Vapor 14 Elite FG',
      description: 'Zapatos de fútbol Nike Mercurial.',
      category: await Category.findOne({ name: 'Calzado' }),
      code: 'V14FGN',
      price: 1250,
      stock: 78,
      picture: `http://localhost:${PORT}/uploads/uh3hjsdf84UH7enfe8TE7y.jpg`
    }).save(),
    new Product({
      name: 'Adidas Champions 2022',
      description: 'Pelota oficial de la UEFA Champions League 2022.',
      category: await Category.findOne({ name: 'Pelotas' }),
      code: 'P452',
      price: 2550,
      stock: 90,
      picture: `http://localhost:${PORT}/uploads/J8ur27JUfdt39Ljd89Lc49.jpg`
    }).save(),
    new Product({
      name: 'Adidas predator 20+ FG',
      description: 'Zapatos de fútbol Adidas',
      category: await Category.findOne({ name: 'Calzado' }),
      code: 'JHDN294',
      price: 1500,
      stock: 78,
      picture: `http://localhost:${PORT}/uploads/jHEI834Hksn83hHJE748JD.jpg`
    }).save(),
    new Product({
      name: 'Nike STRK',
      description: 'Pelota de fútbol Nike',
      category: await Category.findOne({ name: 'Pelotas' }),
      code: 'BDN834',
      price: 1870,
      stock: 145,
      picture: `http://localhost:${PORT}/uploads/jdIE934JFuen834Jkeu8he.jpg`
    }).save(),
  ])

  logger.info('Products has been initialized successfuly.')
}

export default initDatabase
