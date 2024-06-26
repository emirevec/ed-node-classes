const { request, response } = require('express')
const { createProduct, getProducts} = require('../services/products')


const renderFormProduct = (req = request, res = response) => {
  const user = req.user
  if (user) {
    res.render('./product/formProduct')
  } else {
    res.render('./user/login')
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
    const productRegistered = await createProduct({product})

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
