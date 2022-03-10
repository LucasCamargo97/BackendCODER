import { Router } from 'express'
import { createPurchase, getPurchase, getPurchases } from '../controllers/purchaseController.js'
const purchaseRouter = Router()

purchaseRouter.post('/', createPurchase)

purchaseRouter.get('/:purchaseId', getPurchase)

purchaseRouter.get('/', getPurchases)

export default purchaseRouter
