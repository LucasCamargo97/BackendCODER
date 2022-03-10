import { JWT } from '../config/config.js'
import jwt from 'jsonwebtoken'

export const current = (req, res) => {
  const user = req.user
  res.json(user)
}

export const signup = (req, res) => {
  res.json({ message: 'Signed up' })
}

export const signin = (req, res) => {
  const user = req.user

  const token = jwt.sign(user, JWT.SECRET)

  res.cookie('JWT_COOKIE', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  })

  res.json({ message: 'Logged in' })
}

export const logout = (req, res) => {
  res.clearCookie('JWT_COOKIE')
  res.json({ message: 'Logged out' })
}
