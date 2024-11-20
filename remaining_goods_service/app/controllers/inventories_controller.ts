import type { HttpContext } from '@adonisjs/core/http'
import { createInventoryValidator, updateInventoryValidator } from '#validators/inventory'
import Inventory from '#models/inventory'
import Product from '#models/product'
import { AlreadyExistsException, NotFoundException } from '#exceptions/errors_exceptions'
export default class InventoriesController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const filters = request.qs()

    const query = Inventory.query()

    const filterMap: Record<string, string | [string, string]> = {
      PLU: 'PLU',
      SHOP_ID: 'shop_id',
      SHELF_MIN: ['quantity_on_shelf', '>='],
      SHELF_MAX: ['quantity_on_shelf', '<='],
      ORDER_MIN: ['quantity_in_order', '>='],
      ORDER_MAX: ['quantity_in_order', '<='],
    }

    for (const [key, value] of Object.entries(filters)) {
      if (value && key in filterMap) {
        const filter = filterMap[key]
        if (Array.isArray(filter)) {
          query.where(filter[0], filter[1], value)
        } else {
          query.where(filter, value)
        }
      }
    }
    const inventories = await query

    return response.ok({ data: inventories })
  }
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createInventoryValidator)
    console.log('payload', payload)

    const existingProduct = await Product.findBy('plu', payload.PLU)
    if (!existingProduct) {
      throw new NotFoundException(`product with ${payload.PLU} PLU does not exist`)
    }
    const existingInventory = await Inventory.query()
      .where('plu', existingProduct.PLU)
      .andWhere('shop_id', payload.shop_id)
      .first()
    if (existingInventory) {
      throw new AlreadyExistsException(
        `Inventory with PLU ${payload.PLU} already exists for shop_id ${payload.shop_id}. Use update endpoint`
      )
    }

    const inventory = await Inventory.create({
      PLU: payload.PLU,
      quantity_on_shelf: payload.quantity_on_shelf,
      quantity_in_order: payload.quantity_in_order,
      shop_id: payload.shop_id,
    })
    return response.created({ message: 'invetory created successufy', data: inventory })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ request, response }: HttpContext) {
    const payload = await request.validateUsing(updateInventoryValidator)

    const existingInventory = await await Inventory.query()
      .where('PLU', payload.PLU)
      .andWhere('shop_id', payload.shop_id)
      .first()
    if (!existingInventory) {
      throw new NotFoundException(
        `Inventory with PLU ${payload.PLU} and shop_id ${payload.shop_id} not found`
      )
    }
    existingInventory.merge({
      quantity_on_shelf: payload.quantity_on_shelf ?? existingInventory.quantity_on_shelf,
      quantity_in_order: payload.quantity_in_order ?? existingInventory.quantity_in_order,
    })

    await existingInventory.save()

    return response.ok({ message: 'updated', data: existingInventory })
  }

  /**
   * Handle form submission for the edit action
   */

  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
