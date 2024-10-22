/**
 * @file userControllers.js
 * @description Contains the controller functions for managing user-related views and operations in the application. 
 */

/** Import statements. */
import { request, response } from 'express'
import { validationResult } from 'express-validator'
import ROUTES from '../config/routes.js'

/** Import user's services. */
import UserService from '../services/UserService.js'
import { authenticateUser, sendEmail} from '../services/users/index.js'

/** 
 * @module controllers/user
 */

/** Handler rendering user's list. @function */
const showUsers = async (req = request, res = response) => {
  try {
    const users = await UserService.getUsers({})
    res.render(ROUTES.USERS.LIST, {user: users})
  } catch (error) {
    console.error(error)
    const err = "An error has ocurred when trying to get the list of users."
    return res.render('error', {error: err})
  }
}

/** Handler rendering user's "join" form. @function */
const renderFormJoinNow = (req = request, res = response) => {
  res.render(ROUTES.USERS.JOIN)
}

/** Handler rendering user's "log in" form. @function */
const renderFormLogIn = (req = request, res = response) => {
  res.render(ROUTES.USERS.LOG_IN)
}

/** Handler rendering user's "account information" form. @function */
const renderFormAccount = async (req = request, res = response) => {
  const userLogged = req.user
  try {
    if (userLogged) {
      const user = await UserService.getUsers({id: userLogged})
      res.render(ROUTES.USERS.ACCOUNT, {user: user})
    } else {
      res.render(ROUTES.USERS.LOG_IN)
    }
  } catch (error) {
    const err = 'Error from renderFormAccount'
    return res.render('error', {error: err})
  }
}

/** Handler for registering new users. @function */
const createNewUser = async (req = request, res = response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = "You've entered an invalid data, please check it and do it again."
    return res.render('error', {error: err})
  }
  
  const { name, email, password } = req.body
  const person = {
    name: name,
    email: email,
    password: password
  }

  try {
    const newUser = await UserService.createNewUser({person: person})
    if (!newUser) {
      const err = 'Email user already exist, plese go to log in.'
      return res.render('error', {error: err})
    }
    /* sendEmail(newUser.name, newUser.email)
      .then(console.log('Email sent')) */
    return res.render(ROUTES.USERS.LOG_IN)
  } catch (error) {
    console.error(error.message)
    const err = "An error has occurred when trying to create the user."
    return res.render('error', {error: err})
  }
} 

/** Handler for updating user's information. @function */
const updateUserAccount = async (req = request, res = response) => {
  const userLogged = req.user
  if (userLogged) {
    const { name, email } = req.body
    try {
      const userUpdated = await UserService.updateUser({name, email})
      if (userUpdated) {
        res.render(ROUTES.USERS.ACCOUNT, {message: 'User name successfully updated.', user: userUpdated})
      } else {
        res.render('error', {error: 'Cannot update user, please check your data and try again.'})
      }
    } catch (error) {
      console.error(error.message)
      const err = "An error has occurred when trying to update user's name"
      return res.render('error', {error: err})
    }
  } else {
    res.render(ROUTES.USERS.LOG_IN)
  }
}

/** Handler for deleting user's account. @function */
const deleteUserAccount = async (req = request, res = response) => {
  const userLogged = req.user
  if (userLogged) {
    try {
      const userDeleted = await UserService.deleteUser({id: userLogged})
      console.log(userDeleted)
      if (userDeleted) {
        res.clearCookie('auth-token').render(ROUTES.USERS.ACCOUNT, {message: 'User was successfully deleted.'})
      } else {
        res.render('error', {error: 'Cannot delete user account, we want you here.'})
      }
    } catch (error) {
      console.error(error.message)
      const err = "An error has occurred when trying to delet user's account"
      return res.render('error', {error: err})
    }
  } else {
    res.render(ROUTES.USERS.LOG_IN)
  }
}

/** Handler for users loging in. @function */
const logIn = async (req = request, res = response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = "You've entered an invalid data, please check it and do it again."
    return res.render('error', {error: err})
  }

  try {
    const { email, password } = req.body
    const {user, token} = await authenticateUser({email, password})

    res.cookie('auth-token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      path: '/'
      }
    ).render(ROUTES.PRODUCTS.FORM)

  } catch (error) {
    console.error(error.message)  
    const err = 'An error has occurred when trying to log in. May be email, password or both are incorrect!!'
    return res.render('error', { error: err })
  }
}

/** Handler for users loging out. @function */
const logOut = async (req = request, res = response) => {
  res.clearCookie('auth-token').render('index')
}

export {
  showUsers,
  createNewUser,
  updateUserAccount,
  deleteUserAccount,
  renderFormJoinNow,
  renderFormLogIn,
  renderFormAccount,
  logIn,
  logOut
}