const express = require('express')
const router = express.Router()
const { getUsers, createUsers, updateUsers, deleteUsers } = require('../controllers/userControllers')

router.get('/', getUsers)

/* router.post('/users', createUsers)

router.put('/users', updateUsers )

router.delete('/users', deleteUsers) */

module.exports = router
