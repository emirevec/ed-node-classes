import express from 'express'
import * as http from 'http'
import cors from 'cors'
import debug from 'debug';
import { CommonRoutesConfig } from './src/common/routes/common.routes.config';
import { UsersRoutes } from './src/routes/users.routes';

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const PORT = 3000
const routes: Array<CommonRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')

app.use(express.json())
app.use(cors())
routes.push(new UsersRoutes(app))

const runningMessage = `Server is running at http://localhost:${PORT}`

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage)
})

server.listen(PORT, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName}`)
  })
  console.log(runningMessage)
})
