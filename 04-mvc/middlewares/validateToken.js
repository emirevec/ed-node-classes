const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const validateToken = async (req, res, next) => {
  const signature = process.env.JWT_SECRET;
  const token = req.headers['auth-token'];
  if (!token) {
    req.user = null
    next()
    return
  }

  try {
    const user = await jwt.verify(token, signature)
    req.user = user
    next()
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = validateToken
