const router = require('express').Router()
const { validateUserLogInData } = require('../middlewares')
const { 
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  renderFormJoinNow,
  renderFormLogIn,
  renderFormAccount,
  logIn
} = require('../controllers/userControllers')

router.get('/', getUsers)

router.get('/joinnow', renderFormJoinNow)

router.post('/joinnow', validateUserLogInData(), createUser)

router.get('/login', renderFormLogIn)

router.post('/login', validateUserLogInData(), logIn)

router.get('/account', renderFormAccount)

router.put('/account', updateUser)

router.delete('/account', deleteUser)

module.exports = router
