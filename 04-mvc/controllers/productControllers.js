const { request, response } = require('express')
const Product = require('../models/productModel')

const renderFormProduct = (req = request, res = response) => {
  res.render('./product/formProducts')
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
      return res.render('./product/formProducts', {message: 'The new product has been succesfully added!'})
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
  registerProduct
}
