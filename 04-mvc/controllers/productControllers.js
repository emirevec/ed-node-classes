const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const Product = require('../models/productModel')
const getProducts = require('../services/getProducts')
const dotenv = require('dotenv')
dotenv.config()

const renderFormProduct = async (req = request, res = response) => {
  const signature = process.env.JWT_SECRET;
  
  try {
    const token = req.headers.auth-token;
    const user = await jwt.verify(token, signature)
    console.log(user)
    console.log(user.name)
    if (user) {
      res.render('./product/formProduct')
    } else {
      res.render('./user/login')
    }
  } catch (error) {
    console.error(error.message)  
    const err = 'An error has occurred when trying to validate user credentials.'
    return res.render('error', { error: err })
  }
}

const renderProductsList = async (req = request, res = response) => {
  try {
    const products = await getProducts()
    return res.render('product/cardProducts', {product: products})
  } catch (error) {
    console.error(error.message)
    const err = 'An error has occurred when trying to show the list of products.'
    return res.render('error', {error: err})
  }
}


const renderProductDetail = async (req = request, res = response) => {
  const id = req.params._id
  try {
    const product = await getProducts(id)
    return res.render('product/detailProduct', {product: product})
  } catch (error) {
  console.error(error.message)
  const err = 'An error has occurred when trying to show the product detail.'
  return res.render('error', {error: err})
  }
}

const registerProduct = async (req = request, res = response) => {
  const { name, price, image, description } = req.body
  const product = {
    name: name,
    price: Number(price),
    image: image,
    description: description
  }

  try {
    const newProduct = new Product(product)
    const productRegistered = await newProduct.save()

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

module.exports = {
  renderFormProduct,
  renderProductDetail,
  renderProductsList,
  registerProduct
}
