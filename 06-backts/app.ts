import { Server } from './index'
import { AppRouter } from './router/router'
const server = new Server({port: 8080, router: AppRouter.routes})

server.
