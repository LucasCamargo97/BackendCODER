import passport from 'passport'

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err)
      if (!user) return res.status(500).json({ message: info.message })
      req.user = user
      next()
    })(req, res, next)
  }
}
