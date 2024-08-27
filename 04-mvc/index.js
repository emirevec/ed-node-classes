/**
 * @file index.js
 * @description Setting up the Express server.
*/

/** Import Statements. */
import express from 'express'
import morgan from 'morgan'
import hbs from 'hbs'
//import { productRouter, userRouter } from './routers/index.js'
import { userRouter } from './routers/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
//const addRequestLog = require('./middlewares')

/**
 * @module app
 * @description Initializes middlewares, sets up view engines and defines routes.
 */
const app = express()

/** 
 * Middleware and configurations.
*/
//app.use(addRequestLog)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())

/**
 * View engine set up.
 */
app.set('view engine', 'hbs')
app.set('views', 'views')
hbs.registerPartials('views/partials')



/**
 * Route Handlers set up.
 */
app.use('/user', userRouter)
// app.use('/product', productRouter)

/**
 * Index route.
 * Renders the index.html.
 * @method get/
 */
app.get('/', (req, res) => {
  res.render('index')
})

/**
 * Error route.
 * Renders the error view for any undefined routes.
 * @method get/*
 */
app.get('*', (req, res) => {
  res.render('error')
})

export default app
