import { check } from 'express-validator'

const validateUserLogInData = () => {
  return [
    check("email").isEmail(),
    check("password").isString().isLength({min: 6}),
  ]
}

export default validateUserLogInData
