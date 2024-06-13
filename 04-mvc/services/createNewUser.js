const User = require('../models/userModel')
const bcrypt = require('bcrypt')

/**
 * Creates a new user.
 * 
 * This function creates a new user based on the provided person object.
 * It first checks if a user with the same email already exists.
 * If the user does not exist, it hashes the user's password and saves the new user to the database.
 * 
 * @async
 * @function createNewUser
 * @param {Object} params - The parameters for creating a new user.
 * @param {Object} params.person - The person object containing user details.
 * @param {string} params.person.name - The name of the user.
 * @param {string} params.person.email - The email of the user.
 * @param {string} params.person.password - The password of the user.
 * @returns {Promise<Object|null>} - The created user object if successful, or null if the user already exists.
 * @throws {Error} - Throws an error if there is an issue during the process.
 */
const createNewUser = async ({person: person}) => {
  const newUser = new User(person)

  try {
    const userExist = await User.findOne({email: newUser.email})
    if (userExist) {
      return null
    }

    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    const newUserSaved = await newUser.save()
    if (newUserSaved) {
      return newUserSaved
    }
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

module.exports = createNewUser 
