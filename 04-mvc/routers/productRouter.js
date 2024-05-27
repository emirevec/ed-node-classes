const express = require('express')
const router = express.Router()
const {
  registerProduct
} = require('../controllers/productControllers')

router.get('/', registerProduct)

module.exports = router
