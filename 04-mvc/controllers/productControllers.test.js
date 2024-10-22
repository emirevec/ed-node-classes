import ROUTES from '../config/routes'
import MESSAGE from '../config/messages'
import { productModelDataMock, productListDatabaseMock } from '../mocks/productMocks'
import { request, response } from 'express'
import ProductService from '../services/ProductService'
import {
  renderFormProduct,
  renderProductDetail,
  renderProductsList,
  registerProduct
} from './productControllers'

jest.mock('../services/ProductService')

describe('Product controller test', () => {
  let req, res

  beforeEach(() => {
    req = { user: null }
    res = { render: jest.fn()}
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the form for products if the user is authenticated', () => {
    req.user = { id: 'user:id' }

    renderFormProduct(req,res)

    expect(res.render).toHaveBeenCalledWith(ROUTES.PRODUCTS.FORM)
  })

  it('should render the login form if the user is not authenticates', () => {
    renderFormProduct(req,res)

    expect(res.render).toHaveBeenCalledWith(ROUTES.USERS.LOG_IN)
  })

  it('should render the product list successfully', async () => {
    ProductService.getProducts.mockResolvedValue(productListDatabaseMock)

    await renderProductsList(req,res)

    expect(res.render).toHaveBeenCalledWith(ROUTES.PRODUCTS.CARD, { product: productListDatabaseMock })
  })

  it('should render the error page with its error message if an error occurred when trying to show the product list', async () => {
    ProductService.getProducts.mockRejectedValue(new Error(MESSAGE.ERROR.PRODUCT.LIST))

    await renderProductsList(req,res)

    expect(res.render).toHaveBeenCalledWith('error', { error: MESSAGE.ERROR.PRODUCT.LIST})
  })

  it('should register a product successfully', async () => {
    req.body = {
      name: productModelDataMock.name,
      price: productModelDataMock.price,
      image: productModelDataMock.image,
      description: productModelDataMock.description
    }

    ProductService.createProduct.mockResolvedValue(productModelDataMock)

    await registerProduct(req, res)

    expect(res.render).toHaveBeenCalledWith(ROUTES.PRODUCTS.FORM, { message: MESSAGE.SUCCESS.PRODUCT.NEW})
  })
})
