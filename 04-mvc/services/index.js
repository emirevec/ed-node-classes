const sendEmail = require('./sendEmail')
const authenticateUser = require('./authenticateUser')
const getProducts = require('./getProducts')

module.exports = {
  authenticateUser,
  getProducts,
  sendEmail
}