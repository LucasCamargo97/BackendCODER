import loggerHandler from '../middlewares/loggerHandler.js'
import UserService from '../services/userService.js'
const service = new UserService()
const logger = loggerHandler()

export const fetchUsers = (req, res) => {
  service.getUsers()
    .then(users => {
      res.json({ users })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).json({ message: err.message })
    })
}

export const fetchUser = (req, res) => {
  const { userId } = req.params
  service.getUser(userId)
    .then(user => {
      res.json({ user })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).json({ message: err.message })
    })
}
