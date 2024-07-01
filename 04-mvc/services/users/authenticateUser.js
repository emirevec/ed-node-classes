import User from '../../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authenticateUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({email})
    // console.log('Desde auth' + user)
    const validPassword = await bcrypt.compare(password, user.password)
    if(!user || !validPassword) {
      throw new Error('Invalid credentials, please check it and try again.')
    }
    const signature = process.env.JWT_SECRET
    const token = jwt.sign({
      name: user.name
      },
      signature,
      {
        expiresIn: '1h'
      }
    )
    return {user, token}
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export default authenticateUser
