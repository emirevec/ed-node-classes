const router = require('express').Router()
const { validateUserSingInData } = require('../middlewares')
const { 
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  renderFormJoinNow,
  renderFormSingIn,
  renderFormAccount,
  singIn
} = require('../controllers/userControllers')

router.get('/', getUsers)

router.get('/joinnow', renderFormJoinNow)

router.post('/joinnow', validateUserSingInData(), createUser)

router.get('/singin', renderFormSingIn)

router.post('/singin', validateUserSingInData(), singIn)

router.get('/account', renderFormAccount)

router.put('/account', updateUser)

router.delete('/account', deleteUser)

module.exports = router
