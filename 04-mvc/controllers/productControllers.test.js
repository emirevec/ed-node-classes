import ROUTES from '../config/routes'
import { request, response } from 'express'
import ProductService from '../services/ProductService'
import {
  renderFormProduct,
  renderProductDetail,
  renderProductsList,
  registerProduct
} from './productControllers'
import ERROR_MESSAGE from '../config/messages'
import MESSAGE from '../config/messages'

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

    expect(res.render).toHaveBeenCalledWith(ROUTES.PRODUCT_FORM)
  })

  it('should render the login form if the user is not authenticates', () => {
    renderFormProduct(req,res)

    expect(res.render).toHaveBeenCalledWith(ROUTES.USER_LOG_IN)
  })

  it('should render the product list successfully', async () => {
    const productList = {
      product01: {
        name: 'Product_01',
        price: 100,
        image: 'www.imagesrc.com',
        description: 'Product 01 description',
        _id: 'product01_id'
      },
      product02: {
        name: 'Product_01',
        price: 100,
        image: 'www.imagesrc.com',
        description: 'Product 01 description',
        _id: 'product02_id'
      }
    }

    ProductService.getProducts.mockResolvedValue(productList)

    await renderProductsList(req,res)

    expect(res.render).toHaveBeenCalledWith(ROUTES.PRODUCT_CARD, { product: productList })
  })

  it('should render the error page with its error message if an error occurred when trying to show the product list', async () => {
    ProductService.getProducts.mockRejectedValue(new Error(MESSAGE.ERROR.PRODUCT.LIST))

    await renderProductsList(req,res)

    expect(res.render).toHaveBeenCalledWith('error', { error: MESSAGE.ERROR.PRODUCT.LIST})
  })

  it('should register a product successfully', async () => {
    const productData = {
      name: 'Product_01',
      price: 100,
      image: 'www.imagesrc.com',
      description: 'Product 01 description'
    }

    req.body = {
      name: productData.name,
      price: productData.price,
      image: productData.image,
      description: productData.description
    }

    ProductService.createProduct.mockResolvedValue(productData)

    await registerProduct(req, res)

    expect(res.render).toHaveBeenCalledWith(ROUTES.PRODUCT_FORM, { message: MESSAGE.SUCCES.PRODUCT.NEW})
  })

})