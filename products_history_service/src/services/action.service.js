import ProductActionHistory from '../models/productHistory.model.js'
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
      return await ProductActionHistory.findAndCountAll({
        where: filters,
        limit,
        offset,
        order: [['date', 'DESC']]
      })
    } catch (error) {
      console.log('read action error: ', error)
      throw new Error('read action error: ', error)
    }
  }
}
