const express = require('express')

const server = express()

const port = 9000

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})