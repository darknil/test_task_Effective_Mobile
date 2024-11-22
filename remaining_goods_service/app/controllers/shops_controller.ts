import type { HttpContext } from '@adonisjs/core/http'
import { createShopValidator } from '#validators/shop'
import Shop from '#models/shop'
import { AlreadyExistsException } from '#exceptions/errors_exceptions'

export default class ShopsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const shops = await Shop.all()
    return response.ok({ data: shops })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createShopValidator)

    const existingShop = await Shop.findBy('name', payload.name)

    if (existingShop) {
      throw new AlreadyExistsException(`Shop with name ${payload.name} already exists`)
    }
    try {
      const shop = await Shop.create(payload)
      return response.created({ message: 'Shop created successfully', data: shop })
    } catch (error) {
      throw new Error('Shop creation error')
    }
  }

  /**
   * Show individual record
   */
  async show() {}

  /**
   * Edit individual record
   */
  async edit() {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy() {}
}
