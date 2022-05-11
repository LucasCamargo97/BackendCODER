import { config } from 'dotenv'
config()

export const PORT = process.env.PORT || 8080

export const JWT = {
  COOKIE: process.env.JWT_COOKIE,
  SECRET: process.env.JWT_SECRET,
  EXPIRES: process.env.JWT_EXPIRES
}

export const MONGO = {
  URI: process.env.MONGO_URI || ''
}
