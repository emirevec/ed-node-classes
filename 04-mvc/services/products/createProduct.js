import Product from '../../models/productModel.js'

const createProduct = async ({product}) => {
  console.log("Hello I'm createProduct")
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

export default createProduct
