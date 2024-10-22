import { userModelDataMock, userDatabaseMock, userListDatabaseMock } from '../mocks/userMocks'
import MESSAGE from '../config/messages'
import UserService from './UserService'
import User from '../models/userModel'
import bcrypt from 'bcrypt'

jest.mock('../models/userModel')
jest.mock('bcrypt')

describe('UserService Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  
  it('should return null if the email provided is already registered', async () => {
    const mockUserRegistered = jest.fn().mockResolvedValue(userDatabaseMock)

    User.findOne = mockUserRegistered

    const result = await UserService.createNewUser({person: userDatabaseMock})

    expect(mockUserRegistered).toHaveBeenCalledTimes(1)
    expect(result).toBeNull()
  })

  it('should create a user successfully', async () => {
    const userNotFound = jest.fn().mockResolvedValue(null)
    const mockUserSave = jest.fn().mockResolvedValue(userDatabaseMock)
  
    User.findOne = userNotFound
    User.mockImplementation(() => ({ save: mockUserSave}))

    bcrypt.genSalt.mockResolvedValue('mockedSalt')
    bcrypt.hash.mockResolvedValue('hashedPass')
  
    const result = await UserService.createNewUser({ person: userModelDataMock})
  
    expect(userNotFound).toHaveBeenCalledTimes(1)
    expect(mockUserSave).toHaveBeenCalledTimes(1)
    expect(result).toEqual(userDatabaseMock)
  })

  it('should retrieve all users if Id is not provided', async () => {
    const mockUsersList = jest.fn().mockResolvedValue(userListDatabaseMock)

    User.find = mockUsersList

    const result = await UserService.getUsers({})

    expect(mockUsersList).toHaveBeenCalledTimes(1)
    expect(result).toEqual(userListDatabaseMock)
  })

  it('should retrieve a specific user if Id is provided', async () => {
    const mockUserById = jest.fn().mockResolvedValue(userDatabaseMock)

    User.findById = mockUserById

    const result = await UserService.getUsers({id: userDatabaseMock._id})

    expect(mockUserById).toHaveBeenCalledTimes(1)
    expect(result).toEqual(userDatabaseMock)
  })
  

  it('should update users name if valid email is provided', async () => {
    const mockUpdatedUser = jest.fn().mockResolvedValue(userDatabaseMock)

    User.findOneAndUpdate = mockUpdatedUser

    const result = await UserService.updateUser({name: userDatabaseMock.name, email: userDatabaseMock.email})

    expect(mockUpdatedUser).toHaveBeenCalledTimes(1)
    expect(result).toEqual(userDatabaseMock)
  })

  it('should handle and log errors during user creation', async () => {
    const mockSave = jest.fn().mockRejectedValue(new Error(MESSAGE.ERROR.DB))
    User.mockImplementation(() => ({ save: mockSave }))

    console.error = jest.fn()

    const result = await UserService.createNewUser({ person: userModelDataMock })

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(MESSAGE.ERROR.DB)
    expect(result).toBeUndefined()
  })
})