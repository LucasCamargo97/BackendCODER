import express from 'express'
import cors from 'cors'
import passport from 'passport'
import initializePassport from './config/passport-config.js'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'

import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import sessionRouter from './routes/session.routes.js'
import userRouter from './routes/user.routes.js'

import notFoundHandler from './middlewares/notFoundHandler.js'
import loggerHandler from './middlewares/loggerHandler.js'

import { connectMongoDB } from './db/connection.js'
import { PORT } from './config/config.js'
import { __dirname } from './utils.js'
import pkg from '../package.json'
import MessageService from './services/messageService.js'

const logger = loggerHandler()
const messageService = new MessageService()

export default class Servidor {
  constructor () {
    this.app = express()
    this.port = PORT
  }

  middlewares () {
    this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use('/uploads/', express.static(__dirname + '/uploads'))
    this.app.use(passport.initialize())
    initializePassport()
  }

  routes () {
    this.app.get('/api', (req, res) => {
      res.json({
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
        author: pkg.author
      })
    })
    this.app.use('/api', sessionRouter)
    this.app.use('/api/products', productRouter)
    this.app.use('/api/carts', cartRouter)
    this.app.use('/api/users', userRouter)
    this.app.use(notFoundHandler)
  }

  database () {
    connectMongoDB()
  }

  run () {
    this.database()
    this.middlewares()
    this.routes()
    const server = this.app.listen(PORT, () => {
      const message = `| Server listen on port ${PORT} |`
      const link = `| - http://localhost:${PORT}    |`
      console.log('-'.repeat(message.length))
      console.log(message)
      console.log(link)
      console.log('-'.repeat(message.length))
      logger.info(`Server listen on port ${PORT}`)
    })
    server.on('error', err => logger.error(`Error server: ${err}`))

    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    })

    const connectedSockets = {}
    io.on('connection', async socket => {
      console.log('Client connected.')
      if (socket.handshake.query.name) {
        if (Object.values(connectedSockets).some(user => user.id === socket.handshake.query.id)) {
          Object.keys(connectedSockets).forEach(idSocket => {
            if (connectedSockets[idSocket].id === socket.handshake.query.id) {
              delete connectedSockets[idSocket]
              connectedSockets[socket.id] = {
                name: socket.handshake.query.name,
                id: socket.handshake.query.id,
                thumbnail: socket.handshake.query.thumbnail
              }
            }
          })
        } else {
          connectedSockets[socket.id] = {
            name: socket.handshake.query.name,
            id: socket.handshake.query.id,
            thumbnail: socket.handshake.query.thumbnail
          }
        }
      }
      io.emit('users', connectedSockets)
      const logs = await messageService.getMessages()
      io.emit('logs', logs)
      socket.on('disconnect', reason => {
        delete connectedSockets[socket.id]
      })
      socket.on('message', async data => {
        if (Object.keys(connectedSockets).includes(socket.id)) {
          await messageService.save({
            author: connectedSockets[socket.id].id,
            content: data
          })
          const logs = await messageService.getMessages()
          io.emit('logs', logs)
        }
      })
    })
  }
}
