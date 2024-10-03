import connection from '../database/connection.js'
import mongoose from 'mongoose'
import User from './userModel.js'

let session

beforeEach(async () => {
  session = await mongoose.startSession()
  session.startTransaction()
})

afterEach(async () => {
  await session.abortTransaction()
  session.endSession()
})

describe('User Model Test', () => {
  it('should create a user successfully', async () => {
    const validUser = new User({
      name: 'Jonny Doe',
      email: 'jonny@mail.com',
      password: 'pass1234'
    })

    const savedUser = await validUser.save({session})

    expect(savedUser._id).toBeDefined()
    expect(savedUser.name).toBe('Jonny Doe')
    expect(savedUser.email).toBe('jonny@mail.com')
    expect(savedUser.password).toBe('pass1234')
    expect(savedUser.date).toBeDefined()
  })

  it('should require name, email and password fields', async () => {
    const userWithoutRequiredFields = new User({})

    let err
    try {
      await userWithoutRequiredFields.save()
    } catch (error) {
      err = error
    }

    expect(err).toBeDefined()
    expect(err.errors.name).toBeDefined()
    expect(err.errors.email).toBeDefined()
    expect(err.errors.password).toBeDefined()
  })

  it('should enforce unique email constraint', async () => {
    const user1 = new User({
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'pass1234'
    })

    const user2 = new User({
      name: 'Jane Doe',
      email: 'john@mail.com',
      password: 'pass1234'
    })

    await user1.save({session})

    let err
    try {
      await user2.save({session})
    } catch (error) {
      err = error
    }

    expect(err).toBeDefined()
    expect(err.code).toBe(11000)
  })

  it('should set the default date if not provided', async () => {
    const userWithoutDate = new User({
      name: 'John Doe Second',
      email: 'johnSecond@mail.com',
      password: 'pass1234'
    })

    const savedUser = await userWithoutDate.save({session})

    expect(savedUser.date).toBeDefined()
    
    const now = new Date()

    expect(savedUser.date.getTime()).toBeLessThanOrEqual(now.getTime())
  })
})

afterAll(async () => {
  await mongoose.disconnect()
})

