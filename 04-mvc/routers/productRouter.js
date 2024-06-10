const express = require('express')
const router = express.Router()
const {
  renderFormProduct,
  registerProduct
} = require('../controllers/productControllers')

router.get('/', renderFormProduct)

router.post('/', registerProduct)

module.exports = router
