const express = require('express')
const router = express.Router()
//const getUsers = require('../controllers/userControllers')

router.get('/', goHome)

router.get('/product', getProduct)

router.post('/product', )

router.put('/product', )

router.delete('/product', )

module.exports = router
