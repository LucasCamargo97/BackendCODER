import Cart from '../dao/models/Cart.js'
import User from '../dao/models/User.js'

export default class UserService {
  async getUsers () {
    return await User.find().populate('role')
  }

  async getUser (userId) {
    if (!userId) throw new Error('Missing \'userId\' parameter!')

    const userFound = await User.findById(userId).populate('role')
    if (!userFound) throw new Error('User not found.')

    return userFound
  }
}
