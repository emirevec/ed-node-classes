const express = require('express')
const router = express.Router()
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

router.post('/joinnow', createUser)

router.put('/account', updateUser)

router.delete('/account', deleteUser)

module.exports = router
