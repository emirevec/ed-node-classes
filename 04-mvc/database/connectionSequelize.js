import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const MYSQL_DB = process.env.MYSQL_DB
const MYSQL_USER_PASS= process.env.MYSQL_USER_PASS

const connectionSequelize = new Sequelize(MYSQL_DB, 'root', MYSQL_USER_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
})

connectionSequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

export default connectionSequelize

