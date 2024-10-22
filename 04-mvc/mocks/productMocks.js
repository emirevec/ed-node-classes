const productModelDataMock = {
  name:'Donuts',
  price: 100,
  image: 'http://myimage.com/1234',
  description:'My donut description here'
}

const productListDatabaseMock = [
  {
    name: 'Product_01',
    price: 100,
    image: 'www.imagesrc.com',
    description: 'Product 01 description',
    _id: 'product01_id'
  },
  {
    name: 'Product_02',
    price: 100,
    image: 'www.imagesrc.com',
    description: 'Product 02 description',
    _id: 'product02_id'
  }]

export {
  productModelDataMock,
  productListDatabaseMock
}