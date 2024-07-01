import express from 'express'
import morgan from 'morgan'
import hbs from 'hbs'
import { productRouter, userRouter } from './routers/index.js'
//const addRequestLog = require('./middlewares')

const app = express()

//app.use(addRequestLog)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(morgan('dev'))

app.set('view engine', 'hbs')
app.set('views', 'views')
hbs.registerPartials('views/partials')

app.use('/user', userRouter)
app.use('/product', productRouter)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('*', (req, res) => {
  res.render('error')
})

export default app
