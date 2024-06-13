const Product = require('../models/productModel')

const getProducts = async (id) => {
  try {
    if (!id) {
      const products = await Product.find({})
      return products
    } else {
      const filteredProduct = await Product.findById({_id: id})
      return filteredProduct
    }
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = getProducts
