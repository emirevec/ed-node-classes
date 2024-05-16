const express = require('express')
const app = express()
const morgan = require('morgan')
const hbs = require('hbs')
const userRouter = require('./routers/userRouter')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(morgan('dev'))

app.set('view engine', 'hbs')
app.set('views', './views')
hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res) => {
  res.send('Home page')
})

app.use('/user', userRouter)

module.exports = app
