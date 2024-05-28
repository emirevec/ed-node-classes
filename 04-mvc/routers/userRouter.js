const express = require('express')
const router = express.Router()
const { body, check } = require('express-validator')
const { 
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  renderFormJoinNow,
  renderFormSingIn,
  renderFormAccount
} = require('../controllers/userControllers')

router.get('/', getUsers)

router.get('/joinnow', renderFormJoinNow)

router.get('/singin', renderFormSingIn)

router.get('/account', renderFormAccount)

router.post('/joinnow', [
  check("name").isString(),
  body("email").isEmail(),
  check("password").isString(),
], createUser)

router.put('/account', updateUser)

router.delete('/account', deleteUser)

module.exports = router
