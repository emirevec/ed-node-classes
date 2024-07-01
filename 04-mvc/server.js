import dotenv from 'dotenv'
import app from './index.js'
import connection from './database/connection.js'

dotenv.config()
const PORT = process.env.PORT || 9000


app.listen(PORT, () => {
  console.log(`Example app listening on PORT http://localhost:${PORT}`)
})
