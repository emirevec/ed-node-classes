/**
 * @file productService.js
 * @description Provides service functions for handling product-related operations.
 */

/** Import product's model. */
import Product from '../models/productModel.js'

/**
 * @class ProductService
 * @description Service class for handling product-related operations.
 */
class ProductService {
  /**
   * Creates a new product in the database.
   * @param {Object} options - The options object containing the product data.
   * @param {Object} options.product - The product data to be saved.
   * @returns {Promise<Object|null>} The saved product object if successful, otherwise null.
   */
  static async createProduct ({product}){
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

  /**
 * Retrieves products from the database. 
 * If an ID is provided, it retrieves a single product; otherwise, it retrieves all products.
 * 
 * @param {Object} options - The options object.
 * @param {string} [options.id] - The ID of the product to retrieve. If not provided, all products are retrieved.
 * @returns {Promise<Object|Object[]|null>} - A promise that resolves to the retrieved product(s) or null if an error occurs.
 */
  static async getProducts({id}){
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
}

export default ProductService