import passport from 'passport'
import local from 'passport-local'
import jwt from 'passport-jwt'
import { JWT, PORT } from './config.js'
import User from '../models/User.js'
import { cookieExtractor } from '../utils.js'
import loggerHandler from '../middlewares/loggerHandler.js'
import Cart from '../models/Cart.js'

const logger = loggerHandler()

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

const initializePassport = () => {
  passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email', session: false }, async (req, username, password, done) => {
    try {
      const { first_name, last_name, email, phone } = req.body

      if (!req.file) return done(null, false, { message: 'Couldn\'t upload avatar.' })

      const userFound = await User.findOne({ email })
      if (userFound) return done(null, false, { message: 'User already exists.' })

      const cart = await Cart.create({ products: [] })

      const newUser = new User({
        first_name,
        last_name,
        email,
        phone,
        password: await User.encryptPassword(password),
        role: 'user',
        cart: cart._id,
        profile_picture: `${req.protocol}://${req.hostname}:${PORT}/uploads/${req.file.filename}`
      })

      const savedUser = await newUser.save()

      return done(null, savedUser)
    } catch (err) {
      logger.error(err.message)
      return done(err)
    }
  }))

  passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username })
      if (!user) return done(null, false, { message: 'Username not found.' })

      const matchPassword = await User.comparePassword(password, user.password)
      if (!matchPassword) return done(null, false, { message: 'Username or password invalid.' })

      return done(null, JSON.parse(JSON.stringify(user)))
    } catch (err) {
      logger.error(err.message)
      return done(err)
    }
  }))

  passport.use('jwt', new JWTStrategy({ jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), secretOrKey: JWT.SECRET }, async (jwtPayload, done) => {
    try {
      const user = await User.findById({ _id: jwtPayload._id })
      if (!user) return done(null, false, { message: 'User not found.' })

      return done(null, user)
    } catch (err) {
      logger.error(err.message)
      return done(err)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    const result = await User.findById({ _id: id })
    done(null, result)
  })
}

export default initializePassport
