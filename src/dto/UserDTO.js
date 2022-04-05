export default class UserDTO {
  constructor (user) {
    this.id = user._id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.fullName = `${user.firstName} ${user.lastName}`
    this.email = user.email
    this.username = user.username
    this.phone = user.phone
    this.address = user.address
    this.age = parseInt(user.age)
  }
}
