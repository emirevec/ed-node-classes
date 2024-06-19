const User = require('../../models/userModel')

const updateUser = async ({name, email}) => {
  try {
    const userUpdated = await User.findOneAndUpdate({email: email}, {name: name})
    console.log(userUpdated)
    return userUpdated
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = updateUser
