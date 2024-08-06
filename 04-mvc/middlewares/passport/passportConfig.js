import passport from 'passport'
import User from './models/userModel.js'
import logIn from './login.js'

logIn(passport)

passport.serializeUser(function (user, done) {
  done(null, user._id);
})
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
  done(err, user)
  })
})


export default passport