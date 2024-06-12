const { request, response } = require('express')
const User = require('../models/userModel')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const { authenticateUser, sendEmail } = require('../services')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const getUsers = async (req = request, res = response) => {
  try {
    const users = await User.find({})
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

const createUser = async (req = request, res = response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const err = "You've entered an invalid data, please check it and do it again."
    return res.render('error', {error: err})
  }
  
  const {name, email, password } = req.body
  const person = {
    name: name,
    email: email,
    password: password
  }
  const newUser = new User(person)

  try {
    const userExist = await User.findOne({email: newUser.email})
    if (userExist) {
      const err = 'Email user already exist, plese go to sing in.'
      return res.render('error', {error: err})
    }
    
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    const newUserSaved = await newUser.save()
    if (newUserSaved) {
      /* sendEmail(newUser.name, newUser.email)
        .then(console.log('Email sent')) */
      return res.render('./user/singIn')
    } else {
      throw new Error
    }
  } 
  catch (error) {
    console.error(error.message)
    const err = "An error has occurred when trying to create the user."
    return res.render('error', {error: err})
  }
} 

const updateUser = (req = request, res = response) => {
  res.json({
    actualizado: 'Data updated'
  })
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
    const user = await authenticateUser({email, password})
    const signature = process.env.JWT_SECRET
    const token = jwt.sign({
      name: user.name
      },
      signature,
      {
        expiresIn: '1h'
      }
    )

    res.header('auth-token', token).render('./product/formProduct')

  } catch (error) {
    console.error(error.message)  
    const err = 'An error has occurred when trying to sing in. May be email, password or both are incorrect!!'
    return res.render('error', { error: err })
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  renderFormJoinNow,
  renderFormLogIn,
  renderFormAccount,
  logIn
}