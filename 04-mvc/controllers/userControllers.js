const { request, response } = require('express')
const User = require('../models/userModel')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const sendWelcomeMail = require('../services/emailSender')
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

const renderFormSingIn = (req = request, res = response) => {
  res.render('./user/singIn')
}

const renderFormAccount = (req = request, res = response) => {
  res.render('./user/myAccount')
}

const createUser = async (req = request, res = response) => {
  const valid = validationResult(req)
  if (!valid.isEmpty()) {
    const err = "Wrong log in data."
    return res.render('error', { error: err})
  }
  
  const newUser = new User(req.body)
  
  try {
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    const newUserSaved = await newUser.save()

    sendWelcomeMail(newUser.name, newUser.email)
      .then(console.log('Email sent'))

    if (newUserSaved) {
      return res.render('./user/singIn')
    } else {
      const err = "The new user cannot be created."
      return res.render('error', {error: err})
    }
  } catch (error) {
    console.error(error)
    const err = "An error has ocurred when trying to create the new user."
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

const singIn = async (req = request, res = response) => {
  const { email, password } = req.body
  const valid = validationResult(req)
  if (!valid.isEmpty()) {
    const err = "Wrong sing in data."
    return res.render('error', { error: err})
  }

  try {
    const user = await User.findOne({email})
    console.log(user)
    if(!user) {
      const err = "User doesn't exist, go to Join Now for create an account."
      return res.render('error', {
        error: err
      })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) {
      const err = "Email, password or both are incorrect!!"
      return res.render('error', {
        error: err
      })
    }

    const signature = process.env.JWT_SECRET
    const token = jwt.sign({
      name: user.name
      },
      signature,
      {
        expiresIn: '1h'
      }
    )

    res.header('auth-token', token).render('./product/formProducts')

  } catch (error) {
      const err = 'An error has occurred when trying to log in.'
      return res.render('error', {
        error: err
      })
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  renderFormJoinNow,
  renderFormSingIn,
  renderFormAccount,
  singIn
}