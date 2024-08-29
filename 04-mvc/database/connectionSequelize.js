import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const AZURE_DB=process.env.AZURE_DB
const AZURE_USER_NAME=process.env.AZURE_USER_NAME
const AZURE_USER_PASS=process.env.AZURE_USER_PASS
const AZURE_HOST=process.env.AZURE_HOST

const connectionSequelize = new Sequelize(AZURE_DB, AZURE_USER_NAME, AZURE_USER_PASS, {
  host: AZURE_HOST,
  dialect: 'mssql',
  dialectOptions: {
    encrypt: true,
  },
  logging: false
})

connectionSequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.')
  })
  .then(() =>{
    return connectionSequelize.sync({force: true})
  })
  .then(() => {
    console.log('Database synchronized successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

export default connectionSequelize

