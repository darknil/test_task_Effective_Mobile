import ProductActionHistory from '../models/productHistory.model.js'
import { Op } from 'sequelize'
export class ActionService {
  constructor() {}
  create = async (action) => {
    try {
      const newAction = await ProductActionHistory.create(action)
      return newAction
    } catch (error) {
      console.log('create action error: ', error)
      throw new Error('create action error: ', error)
    }
  }
  update = async (id, updatedFields) => {
    try {
      const action = await ProductActionHistory.findByPk(id)
      if (!action) {
        throw new Error(`Action with ID ${id} not found`)
      }
      const updatedAction = await action.update(updatedFields)
      return updatedAction
    } catch (error) {
      console.log('update action error: ', error)
      throw new Error('Failed to update action')
    }
  }
  read = async (filters = {}) => {
    try {
      const { count, rows } = await ProductActionHistory.findAndCountAll({
        where: filters,
        order: [['date', 'DESC']]
      })
      return { count, rows }
    } catch (error) {
      console.log('read action error: ', error)
      throw new Error('read action error: ', error)
    }
  }
  getWithPagination = async (filters = {}, limit, offset) => {
    try {
      const { count, rows } = await ProductActionHistory.findAndCountAll({
        where: filters,
        limit,
        offset,
        order: [['date', 'DESC']]
      })

      return { count, rows }
    } catch (error) {
      console.error('getWithPagination action error:', error.message)
      throw new Error(error)
    }
  }
  getHistory = async ({
    shop_id,
    plu,
    start_date,
    end_date,
    action,
    page = 1,
    limit = 10
  }) => {
    try {
      const filters = {}

      if (shop_id) filters.shop_id = shop_id
      if (plu) filters.plu = plu
      if (action) filters.action = action

      if (start_date && end_date) {
        filters.date = {
          [Op.between]: [new Date(start_date), new Date(end_date)]
        }
      } else if (start_date) {
        filters.date = { [Op.gte]: new Date(start_date) }
      } else if (end_date) {
        filters.date = { [Op.lte]: new Date(end_date) }
      }

      const offset = (page - 1) * limit

      const { count, rows } = await ProductActionHistory.findAndCountAll({
        where: filters,
        limit,
        offset,
        order: [['date', 'DESC']]
      })

      return {
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(count / limit),
        totalCount: count,
        data: rows
      }
    } catch (error) {
      console.error(
        'Error fetching action history from database:',
        error.message
      )
      throw new Error('Error fetching action history', error)
    }
  }
}
