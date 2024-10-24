import { productModelDataMock } from '../mocks/productMocks'
import MESSAGE from '../config/messages'
import ProductService from './ProductService'
import Product from '../models/productModel'

jest.mock('../models/productModel')

describe('ProductService Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a product successfully', async () => {
    const mockSave = jest.fn().mockResolvedValue(productModelDataMock)

    Product.mockImplementation(() => ({ save: mockSave }))

    const result = await ProductService.createProduct({ product: productModelDataMock})

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(result).toEqual(productModelDataMock)
  })

  it('should return null if product save fails', async () => {
    const mockSave = jest.fn().mockResolvedValue(null)
    Product.mockImplementation(() => ({ save: mockSave}))

    const result = await ProductService.createProduct({ product: productModelDataMock })

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(result).toBeNull()
  })

  it('should handle and log errors during product creation', async () => {
    const mockSave = jest.fn().mockRejectedValue(new Error(MESSAGE.ERROR.DB))

    Product.mockImplementation(() => ({ save: mockSave }))

    console.error = jest.fn()

    const result = await ProductService.createProduct({ product: productModelDataMock })

    expect(mockSave).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(MESSAGE.ERROR.DB)
    expect(result).toBeUndefined()
  })
})
