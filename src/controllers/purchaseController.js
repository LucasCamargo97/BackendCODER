import loggerHandler from '../middlewares/loggerHandler.js'
import PurchaseService from '../services/purchaseService.js'

const service = new PurchaseService()
const logger = loggerHandler()

export const createPurchase = (req, res) => {
  const { productsId, userId } = req.body
  service.createPurchase(productsId, userId)
    .then(purchase => {
      res.json({ purchase })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).json({ message: err.message })
    })
}

export const getPurchase = async (req, res) => {
  const purchaseId = req.params.purchaseId
  service.getPurchaseById(purchaseId)
    .then(purchase => {
      res.json({ purchase })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).json({ message: err.message })
    })
}

export const getPurchases = async (req, res) => {
  service.getPurchases()
    .then(purchases => {
      res.json({ purchases })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).json({ message: err.message })
    })
}

export const updatePurchase = async (req, res) => {
  const purchaseId = req.params.purchaseId
  const { name } = req.body
  service.updatePurchaseById(purchaseId, name)
    .then(purchase => {
      res.json({ purchase })
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).json({ message: err.message })
    })
}

export const deletePurchase = async (req, res) => {
  const purchaseId = req.params.purchaseId
  service.deletePurchaseById(purchaseId)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => {
      logger.error(err.message)
      res.status(500).json({ message: err.message })
    })
}
