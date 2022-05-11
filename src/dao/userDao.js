export default class UserDao {
  constructor () {
    this.users = []
  }

  async getUsers () {
    return this.users
  }

  async getUser (userId) {
    return this.users
  }

  async saveUser (first_name, last_name, email, password, username, phone, address, age, profile_picture) {

  }

  async updateUser (userId, first_name, last_name, email, password, username, phone, address, age, profile_picture) {

  }

  async deleteUser (userId) {

  }
}
