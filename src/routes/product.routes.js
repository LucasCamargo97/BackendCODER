import { Router } from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import uploadService from '../services/uploadService.js'

const productRouter = Router()

productRouter.get('/', getProducts)
productRouter.post('/', uploadService.single('thumbnail'), createProduct)
productRouter.put('/:id', uploadService.single('thumbnail'), updateProduct)
productRouter.delete('/:id', deleteProduct)
productRouter.get('/:id', getProduct)

export default productRouter
