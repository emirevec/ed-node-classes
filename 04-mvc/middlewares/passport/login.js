import User from '../../models/userModel.js'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'

export default function(passport) {
  passport.use('login', new LocalStrategy(
    {
      passReqToCallback: true
    },
    function (req, username, password, done) {
      // check in mongo if a user with username exists or not
      User.findOne({ 'username': username },
        function (err, user) {
          // In case of any error, return using the done method
          if (err) return done(err);
          // Username does not exist, log error & redirect back
          if (!user) {
            console.log('User Not Found with username ' + username);
            return done(null, false, { message: 'User not found.' })
          }
          // User exists but wrong password, log the error
          if (!isValidPassword(user, password)) {
            console.log('Invalid Password');
            return done(null, false, { message: 'Invalid Password' });
          }
          // User and password both match, return user from
          // done method which will be treated like success
          return done(null, user);
        })
    }))
  var isValidPassword = function (user, password) {
    return bcrypt.compareSync(password, user.password);
  }
  return passport
}

