const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 9000

const app = require('./index')

require('./database/connection')

app.listen(PORT, () => {
  console.log(`Example app listening on PORT http://localhost:${PORT}`)
})
