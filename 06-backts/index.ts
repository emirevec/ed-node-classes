import express, { type Router, type Express } from 'express'

interface servidor {
  port: number
  router: Router
}

export class Server {
  
  public app: Express
  // private port: number
  public port: number

  constructor(dato: servidor) {

    const { port, router } = dato

    this.app = express()
    this.port = port
    this.app.use(router)
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor correindo en el puerto ${this.port}`)
    })
  }
}