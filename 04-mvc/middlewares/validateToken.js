import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const validateToken = async (req, res, next) => {
  const token = req.cookies['auth-token']
  if (!token) {
    req.user = null
    next()
    return
  }
  
  const signature = process.env.JWT_SECRET
  try {
    const { id } = await jwt.verify(token, signature)
    req.user = id
    next()
  } catch (error) {
    console.error(error.message)
    next(error)
  }
}

export default validateToken
