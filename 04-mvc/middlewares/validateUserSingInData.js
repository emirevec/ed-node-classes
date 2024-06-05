const { check } = require('express-validator')

const validateUserSingInData = () => {
  return [
    check("email").isEmail(),
    check("password").isString().isLength({min: 6}),
  ]
}

module.exports = validateUserSingInData
