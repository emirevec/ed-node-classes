const { request, response } = require('express')
const User = require('../models/userModel')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const getUsers = async (req = request, res = response) => {
  try {
    const users = await User.find({})
    res.render('usersList', {user: users})
  } catch (error) {
    console.error(error)
    const err = "An error has ocurred when trying to get the list of users."
    return res.render('error', {error: err})
  }
}

const renderFormJoinNow = (req = request, res = response) => {
  res.render('joinNow')
}

const renderFormSingIn = (req = request, res = response) => {
  res.render('singIn')
}

const renderFormAccount = (req = request, res = response) => {
  res.render('myAccount')
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

    if (newUserSaved) {
      return res.render('singIn')
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

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  renderFormJoinNow,
  renderFormSingIn,
  renderFormAccount
}