const express = require('express')
const app = express()
const morgan = require('morgan')
//const hbs = require('hbs')
const userRouter = require('./routers/userRouter')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Home page')
})

app.use('/user', userRouter)
app.use('/product', productRouter)

module.exports = app
