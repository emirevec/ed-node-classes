const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const authenticateUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({email})
    // console.log('Desde auth' + user)
    const validPassword = await bcrypt.compare(password, user.password)
    if(!user || !validPassword) {
      throw new Error('Invalid credentials, please check it and try again.')
    }
    return user
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

module.exports = authenticateUser
