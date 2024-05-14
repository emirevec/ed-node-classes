const express = require('express')
const router = express.Router()
const { goHome, getUsers, createUsers, updateUsers, deleteUsers } = require('../controllers/userControllers')

router.get('/', goHome)

router.get('/users', getUsers)

router.post('/users', createUsers)

router.put('/users', updateUsers )

router.delete('/users', deleteUsers)

module.exports = router
