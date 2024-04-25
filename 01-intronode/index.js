// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  const url = req.url

  console.log(req.url)
  console.log(req.method)
  console.log(req.headers)

  switch (url) {
    case '/':
      res.end('Hello world!\n')
      break
    case '/products':
      res.end('Products are...\n')
      break
    default:
      res.end('Error 404\n')
  }
});

// starts a simple http server locally on port 8080
server.listen(8080, '127.0.0.1', () => {
  console.log('Listening on http://localhost:8080/');
});

// run with `node server.mjs`
