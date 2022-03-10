import { Router } from 'express'
import { passportCall, checkAuthorization } from '../middlewares/passport.js'
import { signup, signin, logout, current } from '../controllers/sessionController.js'
import uploadService from '../services/uploadService.js'

const sessionRouter = Router()

sessionRouter.post('/signup', uploadService.single('avatar'), passportCall('signup'), signup)

sessionRouter.post('/signin', passportCall('signin'), signin)

sessionRouter.get('/current', passportCall('jwt'), checkAuthorization(['administrator', 'user']), current)

sessionRouter.post('/logout', logout)

export default sessionRouter
