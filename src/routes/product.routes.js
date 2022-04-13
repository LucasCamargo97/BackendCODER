import { Router } from 'express'
import { fetchProducts, fetchProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import uploadService from '../services/uploadService.js'

const productRouter = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        category:
 *          type: string
 *        code:
 *          type: string
 *        price:
 *          type: integer
 *        stock:
 *          type: integer
 *        picture:
 *          type: string
 *      example:
 *        name: Strawberry
 *        description: A delicious strawberry
 *        category: fruit
 *        code: STB
 *        price: 250
 *        stock: 10
 *        picture: https://i.imgur.com/j9XyQ8l.jpg
 */

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product.
 *    tags: [Product]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: Returns a new product created.
 */

productRouter.post('/', uploadService.single('picture'), createProduct)

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get all products.
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: Returns all products created.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */

productRouter.get('/', fetchProducts)

/**
 * @swagger
 * /api/products/{productId}:
 *  get:
 *    summary: Get a product.
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *          type: string
 *          required: true
 *          description: ObjectId of product to get
 *    responses:
 *      200:
 *        description: Returns a specific product.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Product'
 */

productRouter.get('/:productId', fetchProduct)

/**
 * @swagger
 * /api/products/{productId}:
 *  put:
 *    summary: Update a product.
 *    tags: [Product]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Product'
 *    parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *          type: string
 *          required: true
 *          description: ObjectId of product to update.
 *    responses:
 *      200:
 *        description: Returns a product updated.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Product'
 */

productRouter.put('/:productId', uploadService.single('picture'), updateProduct)

/**
 * @swagger
 * /api/products/{productId}:
 *  delete:
 *    summary: Delete a product.
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *          type: string
 *          required: true
 *          description: ObjectId of product to delete.
 *    responses:
 *      204:
 *        description: Product has been deleted succesfully.
 */

productRouter.delete('/:productId', deleteProduct)

export default productRouter
