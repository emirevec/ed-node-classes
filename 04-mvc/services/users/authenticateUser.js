/**
 * @file authenticateUser.js
 * @description Provides a service function for users authenticating.
 */

/** Import user's model. */
import User from '../../models/userModel.js'

/** Import library statments. */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

/** Load environment variables from .env file. */
dotenv.config()

/**
 * Authenticates a user with the given email and password.
 * @param {Object} credentials - The credentials for authentication.
 * @param {string} credentials.email - The email of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Promise<Object>} - An object containing the authenticated user and a JWT token.
 */
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
      id: user._id
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
