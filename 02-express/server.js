const express = require('express')
const dotenv = require('dotenv')

const server = express()

dotenv.config()

const { 
  middleware,
  anotherMddleware,
  lastMiddleware 
} = require('./middlewares')

const PORT = process.env.PORT || 9000

server.use(middleware)

server.use(express.json)
server.use(express.urlencoded({extended: true}))

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

server.get('/download', (req, res) => {
  res.status(200).download(__dirname + '/invoice.pdf')
})

server.get('/goto', (req, res) => {
  res.status(200).redirect('http://www.google.com')
})

server.post('/file', (req, res) => {
  res.send('Succed')
})

server.delete('/delete/:id', (req, res)=>{
  console.log(req.body)
  res.send('Delete ok.')
})

server.put('/update', (req, res)=>{
  console.log(req.body)
  res.send('Modify ok.')
})

server.path('/updatePath', (req, res)=>{
  console.log(req.body)
  res.send('Modify by path.')
})

server.listen(PORT, () => {
  console.log(`Example app listening on PORT http://localhost:${PORT}`)
})
