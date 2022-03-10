import { config } from 'dotenv'
config()

export const PORT = process.env.PORT || 8080

export const JWT = {
  SECRET: process.env.JWT_SECRET,
  EXPIRES: process.env.JWT_EXPIRES
}

export const MONGO = {
  URI: process.env.MONGO_URI || ''
}

export const TWILIO = {
  CLIENT_SID: process.env.TWILIO_CLIENT_SID,
  AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  SANDBOX_WHATSAPP_NUMBER: process.env.TWILIO_SANDBOX_WHATSAPP_NUMBER,
  PERSONAL_NUMBER: process.env.TWILIO_PERSONAL_NUMBER
}

export const MAILER_AUTH = {
  USER: process.env.MAILER_AUTH_USER,
  PASSWORD: process.env.MAILER_AUTH_PASSWORD
}
