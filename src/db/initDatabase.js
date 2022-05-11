import User from '../models/User.js'
import Cart from '../models/Cart.js'
import { PORT } from '../config/config.js'
import loggerHandler from '../middlewares/loggerHandler.js'

const logger = loggerHandler()

const initDatabase = async () => {
  try {
    await createUsers()
  } catch (err) {
    logger.error(err.message)
  }
}

const createUsers = async () => {
  const count = await User.estimatedDocumentCount()
  if (count > 0) return

  new User({
    first_name: 'Lucas',
    last_name: 'Camargo',
    email: 'lucascam@gmail.com',
    password: await User.encryptPassword('luk'),
    username: 'lucascam',
    phone: '+59894885587',
    address: 'Calle angosta 1547',
    age: 24,
    role: 'user',
    profile_picture: `http://localhost:${PORT}/uploads/lucascam.png`,
    cart: await Cart.create({ products: [] })
  }).save()

  new User({
    first_name: 'Mauricio',
    last_name: 'Espinosa',
    email: 'dauespinosa@hotmail.com',
    password: await User.encryptPassword('dau'),
    username: 'dauesp',
    phone: '+52113456789',
    address: 'Chavo del 8 1567',
    age: 25,
    role: 'superadmin',
    profile_picture: `http://localhost:${PORT}/uploads/mauri.jpg`,
    cart: await Cart.create({ products: [] })
  }).save()

  logger.info('Users has been initialized successfuly.')
}

export default initDatabase
