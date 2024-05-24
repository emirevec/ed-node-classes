const express = require('express')
const router = express.Router()
const { getUsers, getLogIn, createUsers, updateUsers, deleteUsers } = require('../controllers/userControllers')

router.get('/', getUsers)

router.get('formLogin', getLogIn )

/* router.post('/users', createUsers)

router.put('/users', updateUsers )

router.delete('/users', deleteUsers) */

module.exports = router
