import express from 'express'
import { ActionController } from '../controllers/action.controller.js'
import { validatePagination } from '../middlewares/validatePagination.middleware.js'
export class ApiRoutes {
  constructor() {
    this.ActionController = new ActionController()
    this.router = express.Router()
    this.setupRoutes()
  }
  setupRoutes() {
    this.router.get('/', (req, res) => {
      res.send('Hello from api!')
    })
    this.router.post('/create-product',this.ActionController.createProduct)
    this.router.post('/create-inventory',this.ActionController.createInventory)
    this.router.post('/update-inventory',this.ActionController.updateInventory)

    this.router.get('/history',this.ActionController.getHistory)
    this.router.get('/history-by-shop/:shop_id',this.ActionController.getHistoryByShopId)
    this.router.get('/history-by-plu',this.ActionController.getHistoryByPLU)
    this.router.get('/history-by-date',this.ActionController.getHistoryByDate)
    this.router.get('/history-by-action',this.ActionController.getHistoryByAction)
    this.router.get('/history-by-page',validatePagination,this.ActionController.getHistoryByPage)
  }
  getRouter() {
    return this.router
  }
}
