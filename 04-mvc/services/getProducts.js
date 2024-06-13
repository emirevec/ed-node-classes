const Product = require('../models/productModel')

const getProducts = async () => {
  try {
    const products = await Product.find({})
    return products
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = getProducts
