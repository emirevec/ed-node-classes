const router = require('express').Router()
const { body, check } = require('express-validator')
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

const validateUserInput = () => {
  return [
    check("name").isString(),
    body("email").isEmail(),
    check("password").isString(),
  ]
}

router.get('/', getUsers)

router.get('/joinnow', renderFormJoinNow)

router.post('/joinnow', validateUserInput(), createUser)

router.get('/singin', renderFormSingIn)

router.post('/singin', [
  check("email").isEmail(),
  check("password").isString()
], singIn)

router.get('/account', renderFormAccount)

router.put('/account', updateUser)

router.delete('/account', deleteUser)

module.exports = router
