const express = require('express')

const server = express()

const PORT = 9000

server.get('/', (req, res) => {
  res.send('My first back-end!')
})

server.get('/json', (req, res) => {
  try {
    return res.status(200).json({
      res: 'I am the json response'
    })
  } catch {
    return res.status(404).json({
      res: 'Error, file not found'
    })
  }
})

server.get('/html', (req, res) => {
  res.status(200).end(`
    <h1 style="color: blue">Welcome to our first app!!"</h1>
  `)
})

server.get('/file', (req, res) => {
  res.status(200).sendFile(__dirname + '/index.html')
})

server.post('/file', (req, res) => {
  res.send('Succed')
})

server.get('/download', (req, res) => {
  res.status(200).download(__dirname + '/invoice.pdf')
})

server.get('/goto', (req, res) => {
  res.status(200).redirect('http://www.google.com')
})

server.listen(PORT, () => {
  console.log(`Example app listening on PORT http://localhost:${PORT}`)
})
