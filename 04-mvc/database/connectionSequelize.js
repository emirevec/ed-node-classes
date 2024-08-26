import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const AZURE_DB = process.env.AZURE_DB
const AZURE_USER_NAME = process.env.AZURE_USER_NAME
const AZURE_USER_PASS = process.env.AZURE_USER_PASS
const AZURE_HOST = process.env.AZURE_HOST

const sequelize = new Sequelize(AZURE_DB, AZURE_USER_NAME, AZURE_USER_PASS, {
  host: AZURE_HOST,
  dialect: 'mysql',
  dialectOptions: {
    options: {
      encrypt: true
    }
  },
  logging: false
})

export default sequelize

