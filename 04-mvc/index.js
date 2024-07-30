/**
 * Main application file.
 * @module app
 */
import express from 'express'
import morgan from 'morgan'
import hbs from 'hbs'
import { productRouter, userRouter } from './routers/index.js'
import cookieParser from 'cookie-parser'
//const addRequestLog = require('./middlewares')

/** 
 * Middleware and Configurations
 * ==============================
*/
const app = express()
//app.use(addRequestLog)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(morgan('dev'))

/**
 * View Engine Setup
 * =================
 */
app.set('view engine', 'hbs')
app.set('views', 'views')
hbs.registerPartials('views/partials')

/**
 * Route Handlers
 * ==============
 */
app.use('/user', userRouter)
app.use('/product', productRouter)
app.get('/', (req, res) => {
  res.render('index')
})

/**
 * Error route.
 * Renders the error view for any undefined routes.
 * @route GET *
 */
app.get('*', (req, res) => {
  res.render('error')
})

export default app
