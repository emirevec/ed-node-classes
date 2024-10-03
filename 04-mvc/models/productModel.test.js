import connection from '../database/connection.js'
import mongoose from 'mongoose'
import Product from './productModel.js'

let session

beforeEach(async () => {
  session = await mongoose.startSession()
  session.startTransaction()
})

afterEach(async () => {
  await session.abortTransaction()
  session.endSession()
})

describe('Product Model Test', () => {
  it('should create a product successfully', async () => {
    const validProduct = new Product({
      name:'Donuts',
      price: 100,
      image: 'http://myimage.com/1234',
      description:'My donut description here'
    })

    const savedProduct = await validProduct.save({session})

    expect(savedProduct._id).toBeDefined()
    expect(savedProduct.name).toBe('Donuts')
    expect(savedProduct.price).toBe(100)
    expect(savedProduct.image).toBe('http://myimage.com/1234')
    expect(savedProduct.description).toBe('My donut description here')
  })
})

afterAll(async () => {
  await mongoose.disconnect()
})
