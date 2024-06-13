/**
 * Express router providing product related routes.
 * @module routers/product
 */
const express = require('express')
const router = express.Router()

/**
 * Product controller methods.
 * @const
 */
const {
  renderFormProduct,
  renderProductDetail,
  renderProductsList,
  registerProduct
} = require('../controllers/productControllers')

/**
 * Route serving products list.
 * @name get/
 * @param {string} path
 * @param {callback} renderProductsList - Controller to render the products list.
 */
router.get('/', renderProductsList)

/**
 * Route serving product detail.
 * @name get/detail/:_id
 * @param {string} path
 * @param {callback} renderProductDetail - Controller to render the productd detail.
 */
router.get('/detail/:_id', renderProductDetail)

/**
 * Route serving add product form.
 * @name get/formproduct
 * @param {string} path
 * @param {callback} renderFormProduct - Controller to render the product form.
 */
router.get('/formproduct', renderFormProduct)

/**
 * Route for adding a product.
 * @name post/formproduct
 * @param {string} path
 * @param {callback} registerProduct - Controller to add a product.
 */
router.post('/formproduct', registerProduct)

/**
 * Rout for modify or delete a prodcut.
 * @todo Create the routes and set the controllers.
 */

module.exports = router
