import User from '../../models/userModel.js'

const deleteUser = async ({id}) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id)
    console.log("The user account was deleted")
    console.log(deletedUser)
    return deletedUser
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default deleteUser
