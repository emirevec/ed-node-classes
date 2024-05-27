const { request, response } = require('express')
// const Product = require('..models/productModel')

const registerProduct = (req = request, res = response) => {
  res.render('formProducts')
}

module.exports = {
  registerProduct
}
