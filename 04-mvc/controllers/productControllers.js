/**
 * @file prodcutControllers.js
 * @description Contains the controller functions for managing product-related views and operations in the application. 
 */

/** Import statements. */
import { request, response } from 'express'

/** Import product's services. */
import ProductService from '../services/productService.js'

/** 
 * @module controllers/product
*/

/** Handler rendering product's form. @method */
const renderFormProduct = (req = request, res = response) => {
  const user = req.user
  if (user) {
    res.render('./product/formProduct')
  } else {
    res.render('./user/login')
  }
}

/** Handler for displaying product's list. @method */
const renderProductsList = async (req = request, res = response) => {
  try {
    const products = await ProductService.getProducts({})
    return res.render('product/cardProducts', {product: products})
  } catch (error) {
    console.error(error.message)
    const err = 'An error has occurred when trying to show the list of products.'
    return res.render('error', {error: err})
  }
}

/** Handler for displaying product's details. @method */
const renderProductDetail = async (req = request, res = response) => {
  const id = req.params._id
  try {
    const product = await ProductService.getProducts(id)
    return res.render('product/detailProduct', {product: product})
  } catch (error) {
  console.error(error.message)
  const err = 'An error has occurred when trying to show the product detail.'
  return res.render('error', {error: err})
  }
}

/** Handler for registering new products. @method */
const registerProduct = async (req = request, res = response) => {
  const { name, price, image, description } = req.body
  const product = {
    name: name,
    price: Number(price),
    image: image,
    description: description
  }

  try {
    const productRegistered = await ProductService.createProduct({product})

    if (productRegistered) {
      return res.render('./product/formProduct', {message: 'The new product has been succesfully added!'})
    } else {
      return res.render('error', 'An error has occurred when trying to add the product.')
    }

  } catch (error) {
    console.error(error.message)
    const err = 'An error has occurred when trying to add the product.'
    return res.render('error', {error: err})
  }
}

export {
  renderFormProduct,
  renderProductDetail,
  renderProductsList,
  registerProduct
}
