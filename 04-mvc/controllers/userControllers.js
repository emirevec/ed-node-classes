const { request, response } = require('express')
const User = require('../models/userModels')

const getUsers = (req = request, res = response) => {
  res.send(`<h1>User<h1/>`)
}

const createUsers = async (req = request, res = response) => {
  const user = new User(req.body)
  const userSaved = await user.save()
  if (userSaved) {
    return res.render('resForm', {
      email: req.body.email,
      password: req.body.password,
    })
  }
  
  /* 
  try {
    user.save()
  } catch (err) {
    throw new Error('Error' + err)
    return res.send('error', {error: err})
  }
  res.json({
    users: 'usuario'
  }) */
}

const getLogIn = (req = request, res = response) => {

}

const updateUsers = (req = request, res = response) => {
  res.json({
    actualizado: 'Data updated'
  })
}

const deleteUsers = (req = request, res = response) => {
  res.json({
    eliminado: 'Data deleted'
  })
}

module.exports = {
  getUsers,
  getLogIn,
  createUsers,
  updateUsers,
  deleteUsers
}