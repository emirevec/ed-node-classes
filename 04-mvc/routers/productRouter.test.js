import ROUTES from '../config/routes'
import { productDatabaseMock, productListDatabaseMock } from '../mocks/productMocks'
import request from 'supertest'
import app from '../index'
import {
  renderFormProduct,
  renderProductDetail,
  renderProductsList,
  registerProduct
} from '../controllers/productControllers'

jest.mock('../controllers/productControllers')

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
    const productUrl = ROUTES.PRODUCTS.DETAIL + '/1234'
    //console.log(productUrl)

    renderProductDetail.mockImplementation((req,res) => {
      res.render('product/detailproduct', { product: product})
    })

      const res = await api.get(productUrl)

      //{ product: productDatabaseMock}

      expect(renderProductDetail).toHaveBeenCalled()
      expect(res.status).toBe(200)
  })
})