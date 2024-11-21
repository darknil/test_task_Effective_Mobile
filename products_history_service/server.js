import express from 'express'
import { ApiRoutes } from './src/routes/api.routes.js'
class ExpressServer {
  constructor() {
    this.api = new ApiRoutes()
    this.app = express()
    this.port = process.env.PORT || 3000
    this.setupMiddlewares()
    this.setupRoutes()
    this.startServer()
  }
  startServer(port) {
    const PORT = port || 4000
    this.app.listen(PORT, async () => {
      console.log('===============================================')
      console.log(`Express Server running on port ${PORT}`)
      console.log(`adress: http://localhost:${PORT}/api`)
      console.log('===============================================')
    })
  }
  setupRoutes() {
    this.app.use('/api', this.api.getRouter())
  }
  setupMiddlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }
}
const app = new ExpressServer()
