const middleware = (req, res, next) => {
  console.log('----')
  console.log('Im the middleware')
  console.log('----')
  next()
}

const anotherMddleware = (req, res, next) => {
  console.log('----')
  console.log('Im the middleware')
  console.log('----')
  next()
}

const lastMiddleware = (req, res, next) => {
  console.log('----')
  console.log('Im the middleware')
  console.log('----')
  next()
}

export {
  middleware,
  anotherMddleware,
  lastMiddleware
}