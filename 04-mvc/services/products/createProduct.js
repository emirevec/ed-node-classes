const Product = require('../models/productModel')

const createProduct = async ({product}) => {
  const newProduct = new Product(product)
  try {
    const newProductSaved = await newProduct.save()
    if (newProductSaved) {
      return newProductSaved
    } else {
      return null
    }

  } catch (error) {
    console.error(error.message)
  }
}

module.exports = createProduct
