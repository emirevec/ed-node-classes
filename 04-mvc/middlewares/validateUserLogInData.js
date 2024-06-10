const { check } = require('express-validator')

const validateUserLogInData = () => {
  return [
    check("email").isEmail(),
    check("password").isString().isLength({min: 6}),
  ]
}

module.exports = validateUserLogInData
