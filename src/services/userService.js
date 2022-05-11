import User from '../models/User.js'

export default class UserService {
  async getUsers () {
    return await User.find()
  }

  async getUser (userId) {
    if (!userId) throw new Error('Missing \'userId\' parameter!')

    const userFound = await User.findById(userId)
    if (!userFound) throw new Error('User not found.')

    return userFound
  }
}
