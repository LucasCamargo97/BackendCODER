import dotenv from 'dotenv'
dotenv.config()

export const MONGO_URI = process.env.MONGO_URI || ''
export const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || ''
export const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || ''
export const NGROK_LINK = process.env.NGROK_LINK || ''