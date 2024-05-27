const { request, response } = require('express')
const User = require('../models/userModel')

const getUsers = (req = request, res = response) => {
  res.send(`<h1>User<h1/>`)
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
  const user = new User(req.body)
  const userSaved = await user.save()
  if (userSaved) {
    return res.render('singIn')
  } else {
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