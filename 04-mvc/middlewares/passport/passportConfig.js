import passport from 'passport'
import User from '../../models/userModel.js'
import logIn from './login.js'

logIn(passport)

passport.serializeUser(function (user, done) {
  done(null, user._id);
})
passport.deserializeUser( async function (id, done) {
  try {
    const user = await User.findById(id)
    if(user){
      return done(null, user)
    }
  } catch (error) {
    return done(error, null)
  }
})

export default passport