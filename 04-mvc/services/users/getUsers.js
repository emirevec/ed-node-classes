import User from '../../models/userModel.js'

const getUsers = async ({id}) => {
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

export default getUsers