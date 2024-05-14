const { request, response } = require('express')

const goHome = (req = request, res = response) => {
  res.json({
    Home: 'This is the home site'
  })
}

const getUsers = (req = request, res = response) => {
  res.send(`<h1>Users<h1/>`)
}

const createUsers = (req = request, res = response) => {
  const user = req.body
  res.json({
    users: 'usuario'
  })
}

const updateUsers = (req = request, res = response) => {
}
res.json({
  actualizado: 'Data updated'
})

const deleteUsers = (req = request, res = response) => {
}
res.json({
  eliminado: 'Data deleted'
})
module.exports = {
  goHome,
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers
}