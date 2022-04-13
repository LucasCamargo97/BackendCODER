import { __dirname } from '../utils.js'
import { config } from 'dotenv'
config()

export const PORT = process.env.PORT || 8080
export const PERSISTENCE = process.env.PERSISTENCE

export const SWAGGER = {
  spec: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Gläzen API',
        version: '1.0.0'
      },
      servers: [
        {
          url: `http://localhost:${PORT}`
        }
      ]
    },
    apis: [
      `${__dirname}/routes/*.js`
    ]
  }
}

export const MONGO = {
  URI: process.env.MONGO_URI || ''
}
