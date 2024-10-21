import UserService from './UserService'
import User from '../models/userModel'
import bcrypt from 'bcrypt'

jest.mock('../models/userModel')
jest.mock('bcrypt')

describe('UserService Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const newUserData = {
    name: 'New User',
    email: 'newuser@newmail.com',
    password: 'pass1234'
  }
  
  it('should return null if the email provided is already registered', async () => {
    const userRegistered = {
      name: 'name',
      email: 'user01@mail.com',
      password: 'pass1234hashed',
      date: 'date',
      _id: 'user01_id'
    }

    const mockUserRegistered = jest.fn().mockResolvedValue(userRegistered)

    User.findOne = mockUserRegistered

    const result = await UserService.createNewUser({person: userRegistered})

    expect(mockUserRegistered).toHaveBeenCalledTimes(1)
    expect(result).toBeNull()
  })

  it('should create a user successfully', async () => {
  
    const userNotFound = jest.fn().mockResolvedValue(null)
    const mockUserSave = jest.fn().mockResolvedValue(newUserData)
  
    User.findOne = userNotFound
    User.mockImplementation(() => ({ save: mockUserSave}))

    bcrypt.genSalt.mockResolvedValue('mockedSalt')
    bcrypt.hash.mockResolvedValue('hashedPass')
  
    const result = await UserService.createNewUser({ person: newUserData})
  
    expect(userNotFound).toHaveBeenCalledTimes(1)
    expect(mockUserSave).toHaveBeenCalledTimes(1)
    expect(result).toEqual(newUserData)
  
  })

  it('should retrieve all users if Id is not provided', async () => {
    const usersList = {
      user01: {
        name: 'first name',
        email: 'user01@mail.com',
        password: 'pass1234hashed',
        date: 'date',
        _id: 'user01_id'
      },
      user02: {
        name: 'first name',
        email: 'user02@mail.com',
        password: 'pass1234hashed',
        date: 'date',
        _id: 'user02_id'
      }
    }

    const mockUsersList = jest.fn().mockResolvedValue(usersList)

    User.find = mockUsersList

    const result = await UserService.getUsers({})

    expect(mockUsersList).toHaveBeenCalledTimes(1)
    expect(result).toEqual(usersList)
  })

  it('should retrieve a specific user if Id is provided', async () => {
    const user = {
      name: 'first name',
      email: 'user01@mail.com',
      password: 'pass1234hashed',
      date: 'date',
      _id: 'user01_id'
    }

    const mockUserById = jest.fn().mockResolvedValue(user)

    User.findById = mockUserById

    const result = await UserService.getUsers({id: user._id})

    expect(mockUserById).toHaveBeenCalledTimes(1)
    expect(result).toEqual(user)
  })
  

  it('should update users name if valid email is provided', async () => {
    const updatedUser = {
      name: 'first name',
      email: 'user01@mail.com',
      password: 'pass1234hashed',
      date: 'date',
      _id: 'user01_id'
    }
    const mockUpdatedUser = jest.fn().mockResolvedValue(updatedUser)

    User.findOneAndUpdate = mockUpdatedUser

    const result = await UserService.updateUser({name: updatedUser.name, email: updatedUser.email})

    expect(mockUpdatedUser).toHaveBeenCalledTimes(1)
    expect(result).toEqual(updatedUser)

  })

  it('should handle and log errors during user creation', async () => {
    const ERROR_MESSAGE = 'Database error'

    const mockSave = jest.fn().mockRejectedValue(new Error(ERROR_MESSAGE))
    User.mockImplementation(() => ({ save: mockSave }))

    console.error = jest.fn()

    const result = await UserService.createNewUser({ person: newUserData })

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(ERROR_MESSAGE)
    expect(result).toBeUndefined()
  })
})