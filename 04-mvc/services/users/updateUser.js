import User from '../../models/userModel.js'

const updateUser = async ({name, email}) => {
  try {
    const userUpdated = await User.findOneAndUpdate({email: email}, {name: name}, {new: true})
    return userUpdated
  } catch (error) {
    console.error(error.message)
  }
}

export default updateUser
