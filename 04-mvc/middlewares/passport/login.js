import User from '../../models/userModel.js'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'

export default function(passport) {
  passport.use('login', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async function (req, email, password, done) {
      try {
        const user = await User.findOne({ 'email': email })
        if (!user) {
          console.log('User not found.')
          return done(null, false, { message: 'User not found.' })
        }
        if (!isValidPassword(user, password)) {
          console.log('Invalid Password')
          return done(null, false, { message: 'Invalid Password' })
        }
          return done(null, user)
      } catch (error) {
        console.log('User or password wrong' + email)
        return done(error)
      }
    }))
    const isValidPassword = function (user, password) {
      return bcrypt.compareSync(password, user.password)
    } 
  return passport
}

