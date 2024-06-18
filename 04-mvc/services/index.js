const authenticateUser = require('./authenticateUser')
const createNewUser = require('./createNewUser')
const createProduct = require('./createProduct')
const getProducts = require('./getProducts')
const getUsers = require('./getUsers')
const sendEmail = require('./sendEmail')

module.exports = {
  authenticateUser,
  createNewUser,
  createProduct,
  getProducts,
  getUsers,
  sendEmail
}