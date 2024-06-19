import { request, response } from 'express'
import { validationResult } from 'express-validator'
import { authenticateUser, createUser, getUsers, sendEmail } from '../services/users/index.js'

const showUsers = async (req = request, res = response) => {
  try {
    const users = await getUsers({})
    res.render('./user/usersList', {user: users})
  } catch (error) {
    console.error(error)
    const err = "An error has ocurred when trying to get the list of users."
    return res.render('error', {error: err})
  }
}

const renderFormJoinNow = (req = request, res = response) => {
  res.render('./user/joinNow')
}

const renderFormLogIn = (req = request, res = response) => {
  res.render('./user/login')
}

const renderFormAccount = (req = request, res = response) => {
  res.render('./user/myAccount')
}

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
    const newUser = await createUser({person: person})
    if (!newUser) {
      const err = 'Email user already exist, plese go to log in.'
      return res.render('error', {error: err})
    }
    /* sendEmail(newUser.name, newUser.email)
      .then(console.log('Email sent')) */
    return res.render('./user/LogIn')
  } catch (error) {
    console.error(error.message)
    const err = "An error has occurred when trying to create the user."
    return res.render('error', {error: err})
  }
} 

const updateUser = async (req = request, res = response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = "You've entered an invalid data, please check it and do it again."
    return res.render('error', {error: err})
  }

  const userLogged = req.user
  if (userLogged) {
    const { name, email } = req.body
    try {
      const userUpdated = await updateUser({name, email})
      if (userUpdated) {
        res.render('myAccount',{message: 'User name successfully updated.'})
      } else {
        res.render('error', {error: 'Cannot update user, please check your data and try again.'})
      }
    } catch (error) {
      console.error(error.message)
      const err = "An error has occurred when trying to update user's name"
      return res.render('error', {error: err})
    }
  } else {
    res.render('./user/login')
  }
}

const deleteUser = (req = request, res = response) => {
  res.json({
    eliminado: 'Data deleted'
  })
}

const logIn = async (req = request, res = response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = "You've entered an invalid data, please check it and do it again."
    return res.render('error', {error: err})
  }

  try {
    const { email, password } = req.body
    const {user, token} = await authenticateUser({email, password})

    res.cookie('auth-token', token).render('./product/formProduct')

  } catch (error) {
    console.error(error.message)  
    const err = 'An error has occurred when trying to sing in. May be email, password or both are incorrect!!'
    return res.render('error', { error: err })
  }
}

const logOut = async (req = request, res = response) => {
  res.clearCookie('auth-token').render('index')
}

export {
  showUsers,
  createNewUser,
  updateUser,
  deleteUser,
  renderFormJoinNow,
  renderFormLogIn,
  renderFormAccount,
  logIn,
  logOut
}