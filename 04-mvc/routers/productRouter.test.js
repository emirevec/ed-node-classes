import MESSAGE from '../config/messages'
import ROUTES from '../config/routes'
import { productDatabaseMock, productListDatabaseMock, productModelDataMock } from '../mocks/productMocks'
import request from 'supertest'
import app from '../index'
import { validateToken } from '../middlewares'
import ProductService from '../services/ProductService'
import {
  renderFormProduct,
  renderProductDetail,
  renderProductsList,
  registerProduct
} from '../controllers/productControllers'

jest.mock('../services/ProductService')
jest.mock('../controllers/productControllers')
jest.mock('../middlewares/validateToken')

describe('Product router tests should', () => {
  const api = request(app)
  let req, res

  beforeEach(() => {
    req = { user: null }
    res = { render: jest.fn() }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  
  it('render the list of products', async () => {
    renderProductsList.mockImplementation((req,res) => {
      res.render('product/cardProducts', { product: productListDatabaseMock})
    })

    const res = await api.get(ROUTES.PRODUCTS.MAIN)

    expect(renderProductsList).toHaveBeenCalled()
    expect(res.status).toBe(200)
  })

  it('render the product detail', async () => {
    const productUrl = ROUTES.PRODUCTS.DETAIL + '/:1234'

    renderProductDetail.mockImplementation((req,res) => {
      res.render('product/detailproduct', { product: productDatabaseMock})
    })

      const res = await api.get(productUrl)

      expect(renderProductDetail).toHaveBeenCalled()
      expect(res.status).toBe(200)
  })

  it('render the product form if a valid token is provided', async () => {
    validateToken.mockImplementation((req,res,next) => {
      req.user = 'validId'
      next()
    })

    renderFormProduct.mockImplementation((req,res) => {
      res.render('product/formProduct')
    })

    const res = await api.get(ROUTES.PRODUCTS.FORM)

    expect(validateToken).toHaveBeenCalled()
    expect(renderFormProduct).toHaveBeenCalled()
    expect(res.status).toBe(200)
  })

  /* it('render the success message when a product was correctly added', async () => {
    req.body = {
      name: productModelDataMock.name,
      price: productModelDataMock.price,
      image: productModelDataMock.image,
      description: productModelDataMock.description
    }
    
    ProductService.createProduct.mockResolvedValue(productModelDataMock)

    registerProduct.mockImplementation((req,res) => {
      res.render(ROUTES.PRODUCTS.FORM, {message: MESSAGE.SUCCESS.PRODUCT.NEW})
    })

    const res = await api.post(ROUTES.PRODUCTS.FORM).send(productModelDataMock)

    expect(registerProduct).toHaveBeenCalled()
    expect(res.status).toBe(200)
  }) */
})