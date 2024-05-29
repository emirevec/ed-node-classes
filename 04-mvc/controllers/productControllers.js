const { request, response } = require('express')
// const Product = require('..models/productModel')

const registerProduct = (req = request, res = response) => {
  res.render('./product/formProducts')
}

module.exports = {
  registerProduct
}
