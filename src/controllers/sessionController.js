import { JWT } from '../config/config.js'
import jwt from 'jsonwebtoken'

export const current = (req, res) => {
  const { user } = req
  res.send({ status: 'success', payload: { id: user._id, first_name: user.first_name, last_name: user.last_name, role: user.role, status: user.status, cart: user.cart, phone: user.phone, profile_picture: user.profile_picture } })
}

export const register = (req, res) => {
  res.send({ status: 'success', message: 'Signed up' })
}

export const login = (req, res) => {
  const { user } = req

  const token = jwt.sign(user, JWT.SECRET)

  res.cookie(JWT.COOKIE, token, {
    httpOnly: true,
    maxAge: JWT.EXPIRES
  })

  res.cookie('sessionCookie', 'boom', {
    maxAge: JWT.EXPIRES
  })

  res.send({ status: 'success', payload: { user } })
}

export const logout = (req, res) => {
  res.clearCookie(JWT.COOKIE)
  res.clearCookie('sessionCookie')
  res.json({ message: 'Logged out' })
}
