import ProductService from './productService'
import Product from '../models/productModel'

jest.mock('../models/productModel')

describe('ProductService Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const randomProduct = {
    name: 'Random Product',
    price: 11,
    description: 'Here is the randoms product description'
  }

  it('should create a product successfully', async () => {
    const mockSave = jest.fn().mockResolvedValue(randomProduct)

    Product.mockImplementation(() => ({ save: mockSave }))

    const result = await ProductService.createProduct({ product: randomProduct})

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(result).toEqual(randomProduct)
  })

  it('should return null if product save fails', async () => {
    const mockSave = jest.fn().mockResolvedValue(null)
    Product.mockImplementation(() => ({ save: mockSave}))

    const result = await ProductService.createProduct({ product: randomProduct })

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(result).toBeNull()
  })

  it('should handle and log errors during product creation', async () => {
    const ERROR_MESSAGE = 'Database error'

    const mockSave = jest.fn().mockRejectedValue(new Error(ERROR_MESSAGE))
    Product.mockImplementation(() => ({ save: mockSave }))

    console.error = jest.fn()

    const result = await ProductService.createProduct({ product: randomProduct })

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(ERROR_MESSAGE)
    expect(result).toBeUndefined()
  })
})
