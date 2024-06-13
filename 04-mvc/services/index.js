const authenticateUser = require('./authenticateUser')
const createNewUser =require('./createNewUser')
const getProducts = require('./getProducts')
const sendEmail = require('./sendEmail')

module.exports = {
  authenticateUser,
  createNewUser,
  getProducts,
  sendEmail
}