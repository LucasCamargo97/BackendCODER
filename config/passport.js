import passport from 'passport'
import fbStrategy from 'passport-facebook'
import { UserModel } from '../dao/models/User.js'
import dotenv from 'dotenv'
dotenv.config()

const FacebookStrategy = fbStrategy.Strategy

const initializePassportConfig = () => {
  passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: ' https://fa3a-2800-a4-295d-af00-3499-4ff6-dbbc-fe28.ngrok.io/home',
    profileFields: ['id', 'displayName', 'photos', 'emails']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await UserModel.findOne({ email: profile.emails[0].value })
      if (!user) throw new Error('User not found.')
      const fullName = profile.displayName.split(' ')
      await UserModel.findByIdAndUpdate(user._id, { avatar: profile.photos[0].value, firstName: fullName[0], lastName: fullName[1] })
      done(null, user)
    } catch (err) {
      done(err)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    UserModel.findById(id, done)
  })
}

export default initializePassportConfig