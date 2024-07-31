/**
 * Express router providing product related routes.
 * @module routers/product
 */
import express from 'express'
const router = express.Router()


import { validateToken } from '../middlewares/index.js'
import {
  renderFormProduct,
  renderProductDetail,
  renderProductsList,
  registerProduct
} from '../controllers/productControllers.js'

/**
 * Route serving products list.
 * @method get/
 * @param {string} path
 * @param {callback} renderProductsList - Controller to render the products list.
 */
router.get('/', renderProductsList)

/**
 * Route serving product detail.
 * @method get/detail/:_id
 * @param {string} path
 * @param {callback} renderProductDetail - Controller to render the productd detail.
 */
router.get('/detail/:_id', renderProductDetail)

/**
 * Route serving add product form.
 * @method get/formproduct
 * @param {string} path
 * @param {callback} validateToken - Middleware to validate the incoming token.
 * @param {callback} renderFormProduct - Controller to render the product form.
 */
router.get('/formproduct', validateToken, renderFormProduct)

/**
 * Route for adding a product.
 * @method post/formproduct
 * @param {string} path
 * @param {callback} registerProduct - Controller to add a product.
 */
router.post('/formproduct', registerProduct)

/**
 * Route for modify or delete a prodcut.
 * @method post/deleteproduct
 * @todo Create the routes and set the controllers.
 */
router.post('/deleteproduct', callback)

export default router
