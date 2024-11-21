import { ActionService } from '../services/action.service.js'
export class ActionController {
  constructor() {
    this.ActionService = new ActionService()
  }
  createProduct = async (req, res) => {
    try {
      const { PLU, name } = req.body
      if (!PLU || !name) {
        return res.status(400).json({ error: 'PLU and name are required' })
      }
      const action = await this.ActionService.create({
        plu: PLU,
        name: name,
        action: 'create_product',
        date: new Date()
      })
      return res.status(201).json({
        message: 'The product creation record was successfully added.',
        action
      })
    } catch (error) {
      console.error('Error creating product:', error.message)
      return res
        .status(500)
        .json({ error: 'Failed to write record about creating product' })
    }
  }
  createInventory = async (req, res) => {
    try {
      const { PLU, shop_id, quantity_on_shelf, quantity_in_order } = req.body

      if (
        !PLU ||
        !shop_id ||
        quantity_on_shelf === undefined ||
        quantity_in_order === undefined
      ) {
        return res.status(400).json({
          error:
            'PLU, shop_id, quantity_on_shelf, and quantity_in_order are required'
        })
      }

      const action = await this.ActionService.create({
        plu: PLU,
        name: `Inventory created for ${PLU}`,
        shop_id: shop_id,
        action: 'create_inventory',
        date: new Date()
      })

      return res
        .status(201)
        .json({ message: 'Inventory created successfully', action })
    } catch (error) {
      console.error(
        'Error to write record about create inventory:',
        error.message
      )
      return res
        .status(500)
        .json({ error: 'Failed to write record about create inventory' })
    }
  }
  updateInventory = async (req, res) => {
    try {
      const { id } = req.params
      const { quantity_on_shelf, quantity_in_order } = req.body

      if (!quantity_on_shelf && !quantity_in_order) {
        return res.status(400).json({
          error:
            'At least one field (quantity_on_shelf or quantity_in_order) is required'
        })
      }

      const updatedAction = await this.ActionService.update(id, {
        quantity_on_shelf: quantity_on_shelf,
        quantity_in_order: quantity_in_order,
        action: 'update_inventory'
      })

      return res
        .status(200)
        .json({ message: 'Inventory updated successfully', updatedAction })
    } catch (error) {
      console.error(
        'Error to write record about update inventory:',
        error.message
      )
      return res
        .status(500)
        .json({ error: 'Failed to write record about update inventory' })
    }
  }
  getHistoryByShopId = async (req, res) => {
    try {
      const { shop_id } = req.query

      if (!shop_id) {
        return res.status(400).json({ error: 'shop_id is required' })
      }

      const history = await this.ActionService.read({ shop_id })

      if (!history.length) {
        return res
          .status(404)
          .json({ message: 'No history found for the given shop_id.' })
      }

      return res.status(200).json({ data: history })
    } catch (error) {
      console.error('Error fetching history by shop:', error.message)
      return res.status(500).json({ error: 'Failed to fetch history by shop' })
    }
  }
  getHistoryByPLU = async (req, res) => {
    try {
      const { plu } = req.query

      if (!plu) {
        return res.status(400).json({ error: 'PLU is required' })
      }

      const history = await this.ActionService.read({ plu })

      if (!history.length) {
        return res
          .status(404)
          .json({ message: 'No history found for the given PLU.' })
      }

      return res.status(200).json({ data: history })
    } catch (error) {
      console.error('Error fetching history by PLU:', error.message)
      return res.status(500).json({ error: 'Failed to fetch history by PLU' })
    }
  }
  getHistoryByDate = async (req, res) => {
    try {
      const { start_date, end_date } = req.query

      if (!start_date && !end_date) {
        return res.status(400).json({
          error: 'At least one date (start_date or end_date) is required'
        })
      }

      const filters = {}
      if (start_date && end_date) {
        filters.date = { $between: [new Date(start_date), new Date(end_date)] }
      } else if (start_date) {
        filters.date = { $gte: new Date(start_date) }
      } else if (end_date) {
        filters.date = { $lte: new Date(end_date) }
      }

      const history = await this.ActionService.read(filters)

      if (!history.length) {
        return res
          .status(404)
          .json({ message: 'No history found for the given date range.' })
      }

      return res.status(200).json({ data: history })
    } catch (error) {
      console.error('Error fetching history by date:', error.message)
      return res.status(500).json({ error: 'Failed to fetch history by date' })
    }
  }
  getHistoryByAction = async (req, res) => {
    try {
      const { action } = req.query

      if (!action) {
        return res.status(400).json({ error: 'Action is required' })
      }

      const history = await this.ActionService.read({ action })

      if (!history.length) {
        return res
          .status(404)
          .json({ message: 'No history found for the given action.' })
      }

      return res.status(200).json({ data: history })
    } catch (error) {
      console.error('Error fetching history by action:', error.message)
      return res
        .status(500)
        .json({ error: 'Failed to fetch history by action' })
    }
  }
  getHistoryByPage = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query

      const offset = (page - 1) * limit

      const { count, rows } = await this.ActionService.getHistoryWithPagination(
        {},
        limit,
        offset
      )

      return res.status(200).json({
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(count / limit),
        totalCount: count,
        data: rows
      })
    } catch (error) {
      console.error('Error fetching paginated history:', error.message)
      return res
        .status(500)
        .json({ error: 'Failed to fetch paginated history' })
    }
  }
}
