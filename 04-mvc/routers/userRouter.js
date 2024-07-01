/**
 * Express router providing user related routes.
 * @module routers/user
 */
import express from 'express'

/**
 * Middleware for validating user login data.
 * @const
 */
import { validateUserLogInData } from '../middlewares/index.js'

/**
 * User controller methods.
 * @const
 */
import { 
  showUsers,
  createNewUser,
  updateUser,
  deleteUser,
  renderFormJoinNow,
  renderFormLogIn,
  renderFormAccount,
  logIn
} from '../controllers/userControllers.js'

const router = express.Router()

/**
 * Route serving list of all users.
 * @name get/
 * @param {string} path
 * @param {callback} getUsers - Controller to get all users.
 * @todo add access control.
 */
router.get('/', showUsers)

/**
 * Route serving join now form.
 * @name get/joinnow
 * @param {string} path
 * @param {callback} renderFormJoinNow - Controller to render the join now form.
 */
router.get('/joinnow', renderFormJoinNow)

/**
 * Route for creating a new user.
 * @name post/joinnow
 * @param {string} path 
 * @param {callback} validateUserLogInData - Middleware to validate the user's input data.
 * @param {callback} createUser - Controller to create a new user.
 */
router.post('/joinnow', validateUserLogInData(), createNewUser)

/**
 * Route serving log in form.
 * @name get/login
 * @param {string} path
 * @param {callback} renderFormLogIn - Controller to render the log in form.
 */
router.get('/login', renderFormLogIn)

/**
 * Route for loggin in a user.
 * @name post/login
 * @param {string} path
 * @param {callback} validateUserLogInData - Middleware to validate the user's input data.
 * @param {calback} logIn - Controller to log in a user.
 */
router.post('/login', validateUserLogInData(), logIn)

/**
 * Route serving user information account.
 * @name get/account
 * @param {string} path
 * @param {callback} renderFormAccount - Controller to render user information account.
 */
router.get('/account', renderFormAccount)

/**
 * Route for updating and deleting user's information.
 * @todo Create the flow of views and controller functions.
 */
router.put('/account', updateUser)
router.delete('/account', deleteUser)

export default router
