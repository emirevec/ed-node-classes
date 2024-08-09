/**
 * @file userRouter.js
 * @description Express router providing user related routes.
*/

/** Import statments. */
import express from 'express'

/** Import validating user login data middlewares. */
import { validateToken, validateUserLogInData } from '../middlewares/index.js'

/** Import user controller methods. */
import { 
  showUsers,
  createNewUser,
  updateUserAccount,
  deleteUserAccount,
  renderFormJoinNow,
  renderFormLogIn,
  renderFormAccount,
  renderFormProduct,
  logIn,
  logOut
} from '../controllers/userControllers.js'

/**
 * Define Express router. 
 * @module routers/user 
*/
const router = express.Router()

export default function(passport){

  /**
   * Route serving list of all users.
   * @method get/
   * @param {string} path
   * @param {callback} getUsers - Controller to get all users.
   * @todo add access control.
   */
  router.get('/', showUsers)

  /**
   * Route serving join now form.
   * @method get/joinnow
   * @param {string} path
   * @param {callback} renderFormJoinNow - Controller to render the join now form.
   */
  router.get('/joinnow', renderFormJoinNow)

  /**
   * Route for creating a new user.
   * @method post/joinnow
   * @param {string} path 
   * @param {callback} validateUserLogInData - Middleware to validate the user's input data.
   * @param {callback} createUser - Controller to create a new user.
   */
  router.post('/joinnow', validateUserLogInData(), createNewUser)

  /**
   * Route serving log in form.
   * @method get/login
   * @param {string} path
   * @param {callback} renderFormLogIn - Controller to render the log in form.
   */
  router.get('/login', renderFormLogIn)

  /**
   * Route for loggin in a user.
   * @method post/login
   * @param {string} path
   * @param {callback} validateUserLogInData - Middleware to validate the user's input data.
   * @param {calback} logIn - Controller to log in a user.
   */
  router.post('/login', passport.authenticate('login', {failureRedirect: '/',}), renderFormProduct)
  
  //validateUserLogInData(), logIn)

  /**
   * Route for closing user's session.
   * @method post/login
   * @param {string} path
   * @param {calback} logOut - Controller to close the user's session.
   */
  router.post('/logout', logOut)

  /**
   * Route serving user information account.
   * @method get/account
   * @param {string} path
   * @param {callback} renderFormAccount - Controller to render user information account.
   */
  router.get('/account', validateToken, renderFormAccount)

  /**
   * Route for update user information.
   * @method post/account
   * @param {string} path
   * @param {callback} updateUserAccount - Controller to update the user's information account into the database.
   */
  router.post('/account', validateToken, updateUserAccount)

  /**
   * Route for delete user information.
   * @method delete/account
   * @param {string} path
   * @param {callback} deleteUserAccount - Controller to delete the complete user's account from the database.
   */
  router.delete('/account', validateToken, deleteUserAccount)

  return router
}


