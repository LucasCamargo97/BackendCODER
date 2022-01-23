import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import path from 'path'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import { __dirname } from './utils.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { PORT, MONGO_URI } from './config/config.js'
import ChatsService from './services/chatsService.js'
import chats from './routes/chats.js'
import { UserModel } from './dao/models/User.js'
import upload from './services/upload.js'

const expires = 600
const chatsService = new ChatsService()

export const getConnection = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    }
  } catch (err) {
    console.error(err)
  }
}

const app = express()
const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT} port.`)
  getConnection()
})

const io = new Server(server)

io.on('connection', socket => {
  socket.emit('welcome', '¡Se ha establecido una conexión con socket.io!')
  console.log('Cliente conectado.')
  chatsService.getChats()
    .then(result => {
      io.emit('chats', result.payload)
    })
    .catch(err => {
      console.error(err)
    })
  socket.on('chats', async data => {
    chatsService.createChat(data)
      .then(result => {
        io.emit('chats', result.payload)
        chatsService.getChats()
          .then(result => {
            io.emit('chats', result.payload)
          })
          .catch(err => {
            console.error(err)
          })
      })
      .catch(err => {
        console.error(err)
      })
  })
})

app.engine('handlebars', engine())
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/uploads/', express.static(__dirname + '/uploads'))
app.use(express.static(__dirname + '/public'))

app.use(session({
  store: MongoStore.create({ mongoUrl: MONGO_URI }),
  secret: "lckk1097",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: expires * 1000 }
}))

app.use('/api/chats', chats)

app.post('/api/register', upload.single('avatar'), async (req, res) => {
  try {
    const file = req.file
    const user = req.body
    user.age = parseInt(user.age)
    user.avatar = `${req.protocol}://${req.hostname}:${PORT}/uploads/${file.filename}`

    const emailFound = await UserModel.findOne({ email: user.email })
    if (emailFound) throw new Error('Email already in use.')

    const usernameFound = await UserModel.findOne({ username: user.username })
    if (usernameFound) throw new Error('Username already in use.')

    await UserModel.create(user)
    res.send({ status: 'success', message: 'Registration has been successfully.' })
  } catch (err) {
    console.error(err)
    res.status(400).send({ status: 'error', message: err.message })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) throw new Error('Username or password is not complete.')
    const user = await UserModel.findOne({ email: email })
    if (!user) throw new Error('User not found.')
    if (user.password !== password) throw new Error('Incorrect password.')
    req.session.user = {
      username: user.username,
      email: user.email
    }
    res.send({ status: 'success' })
  } catch (err) {
    console.error(err)
    res.status(400).send({ status: 'error', message: err.message })
  }
})

app.get('/api/login', (req, res) => {
  if (req.session.user)
    res.send(req.session.user)
  else
    res.send({ status: 'error', message: 'You are not log in.' })
})

app.post('/api/logout', (req, res) => {
  const { username } = req.session.user
  req.session.user = null
  res.send({ status: 'success', payload: { username: username } })
})

app.get('/', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/chat', (req, res) => {
  res.render('chat')
})

app.get('/logout', (req, res) => {
  res.render('logout')
})