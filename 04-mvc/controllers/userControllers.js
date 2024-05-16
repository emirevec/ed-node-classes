const { request, response } = require('express')

const getUsers = (req = request, res = response) => {
  res.send(`<h1>User<h1/>`)
}

const createUsers = (req = request, res = response) => {
  const user = req.body
  res.json({
    users: 'usuario'
  })
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
  createUsers,
  updateUsers,
  deleteUsers
}