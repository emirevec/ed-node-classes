import { request, response } from "express"
import { validationResult } from 'express-validator'
import ROUTES from "../config/routes"
import { userDatabaseMock, userListDatabaseMock } from "../mocks/userMocks"
import UserService from '../services/UserService'
import { authenticateUser } from "../services/users"
import {
  showUsers,
  createNewUser,
  updateUserAccount,
  deleteUserAccount,
  renderFormJoinNow,
  renderFormLogIn,
  renderFormAccount,
  logIn,
  logOut
} from './userControllers'
import MESSAGE from "../config/messages"

jest.mock('../services/UserService')

describe('User controller test', () => {
  let req, res

  beforeEach(() => {
    req = {},
    res = { render: jest.fn()}
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the list of all user', async () => {
    UserService.getUsers.mockResolvedValue(userListDatabaseMock)

    await showUsers(req,res)

    expect(res.render).toHaveBeenCalledWith(ROUTES.USERS.LIST, {user: userListDatabaseMock})
  })

  it('should render users log in form', () => {
    renderFormLogIn(req,res)

    expect(res.render).toHaveBeenCalledWith(ROUTES.USERS.LOG_IN)
  })

  it('should render users account information if the user is logged in', async () => {
    req.user = userDatabaseMock

    UserService.getUsers.mockResolvedValue(userDatabaseMock)

    await renderFormAccount(req,res)

    expect(res.render).toHaveBeenCalledWith(ROUTES.USERS.ACCOUNT, { user: userDatabaseMock})
  })

  it('should render users log in form if the user is not logged in', () => {
    renderFormAccount(req,res)

    expect(res.render).toHaveBeenCalledWith(ROUTES.USERS.LOG_IN)
  })

  it('should render errors page if an error occurs while fetching users data', async () => {
    UserService.getUsers.mockRejectedValue(new Error(MESSAGE.ERROR.DB))

    renderFormAccount(req,res)

    expect(res.render).toHaveBeenCalledWith('error', {error: 'Error from renderFormAccount'})
  })
})