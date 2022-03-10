import loggerHandler from '../middlewares/loggerHandler.js'
import CategoryService from '../services/categoryService.js'
const service = new CategoryService()
const logger = loggerHandler()

export const createCategory = (req, res) => {
  const { name } = req.body
  service.createCategory(name)
    .then(category => {
      res.json({ category })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const getCategory = async (req, res) => {
  const categoryId = req.params.categoryId
  service.getCategoryById(categoryId)
    .then(category => {
      res.json({ category })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const getCategories = async (req, res) => {
  service.getCategories()
    .then(categories => {
      res.json({ categories })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId
  const { name } = req.body
  service.updateCategoryById(categoryId, name)
    .then(category => {
      res.json({ category })
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId
  service.deleteCategoryById(categoryId)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({ message: err.message })
    })
}
