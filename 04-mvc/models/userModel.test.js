import connection from './database/connection.js'
import mongoose from 'mongoose'
import User from './userModel.js'

describe('User Model Test', () => {
  // test code here
})

afterAll(async () => {
  await mongoose.disconnect()
})

