import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { JWT } from './config/config.js'

const filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(filename)

export const cookieExtractor = req => {
  let token = null
  if (req && req.cookies) { token = req.cookies[JWT.COOKIE] }
  return token
}
