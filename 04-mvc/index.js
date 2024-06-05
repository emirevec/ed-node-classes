const express = require('express')
const morgan = require('morgan')
const hbs = require('hbs')
const { productRouter, userRouter } = require('./routers')
//const addRequestLog = require('./middlewares')

const app = express()

//app.use(addRequestLog)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(morgan('dev'))

app.set('view engine', 'hbs')
app.set('views', './views')
hbs.registerPartials(__dirname + '/views/partials')

app.use('/user', userRouter)
app.use('/product', productRouter)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('*', (req, res) => {
  res.render('error')
})

module.exports = app
