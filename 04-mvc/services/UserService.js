/**
 * @file UserService.js
 * @description Provides service functions for handling User-related operations.
 */

/** Import user's model. */
import User from '../models/userModel.js'

/** Import statments. */
import bcrypt from 'bcrypt'

/**
 * @class UserService
 * @description Service class for handling user-related operations.
 */
class UserService {
  /**
   * Creates a new user in the database.
   * @param {Object} params - The parameters for creating a new user.
   * @param {Object} params.person - The person object containing user details.
   * @param {string} params.person.name - The name of the user.
   * @param {string} params.person.email - The email of the user.
   * @param {string} params.person.password - The password of the user.
   * @returns {Promise<Object|null>} - The created user object if successful, or null if the user already exists.
   */
  static async createNewUser({person: person}){
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
      // throw error
    }
  }

  /**
 * Retrieves all users or a specific user by ID.
 * @param {Object} params - The parameters for fetching users.
 * @param {string} [params.id] - The ID of the user to fetch (optional).
 * @returns {Promise<Object[]|Object|null>} - A list of users if no ID is provided, a single user object if an ID is provided, or null if the user is not found.
 */
  static async getUsers({id}){
    try {
      if (!id) {
        const users = await User.find({})
        return users
      } else {
        const filteredUser = await User.findById({_id: id})
        return filteredUser
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  /**
 * Updates a user's information in the database.
 * @param {Object} params - The parameters for updating a user.
 * @param {string} params.name - The new name of the user.
 * @param {string} params.email - The email of the user to be updated.
 * @returns {Promise<Object|null>} - The updated user object if successful, or null if the update fails.
 */
  static async updateUser({name, email}){
    try {
      const userUpdated = await User.findOneAndUpdate({email: email}, {name: name}, {new: true})
      return userUpdated
    } catch (error) {
      console.error(error.message)
    }
  }

  /**
 * Deletes a user from the database by ID.
 * @param {Object} params - The parameters for deleting a user.
 * @param {string} params.id - The ID of the user to delete.
 * @returns {Promise<Object|null>} - The deleted user object if successful, or null if the user is not found.
 */
  static async deleteUser({id}){
    try {
      const deletedUser = await User.findByIdAndDelete(id)
      return deletedUser
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default UserService