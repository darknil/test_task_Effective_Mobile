import type { HttpContext } from '@adonisjs/core/http'
import { AlreadyExistsException } from '#exceptions/errors_exceptions'
import Product from '#models/product'
import { createProductValidator } from '#validators/product'
import axios from 'axios'
import 'dotenv/config'

const HISTORY_URL = process.env.HISTORY_URL || 'http://localhost:4000'
export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const products = await Product.all()
    return response.ok({ data: products })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createProductValidator)

    const existingProduct =
      (await Product.findBy('name', payload.name)) || (await Product.findBy('plu', payload.PLU))

    if (existingProduct) {
      throw new AlreadyExistsException(
        `Product with name ${payload.name} or PLU ${payload.PLU} already exists`
      )
    }
    const product = await Product.create(payload)
    try {
      axios.post(`${HISTORY_URL}/api/create-product`, {
        PLU: payload.PLU,
        name: payload.name,
      })
      return response.created({ message: 'Product created successfully', data: product })
    } catch (error) {
      throw new Error('Product creation error')
    }
  }

  /**
   * Show individual record
   */
  async show({ request, response }: HttpContext) {
    const filters = request.qs()

    const productQuery = Product.query()

    const productFilterMap: Record<string, string | [string, string]> = {
      PLU: 'plu',
      NAME: 'name',
    }
    for (const [key, value] of Object.entries(filters)) {
      if (value && key in productFilterMap) {
        const filter = productFilterMap[key]
        if (Array.isArray(filter)) {
          productQuery.where(filter[0], filter[1], value)
        } else {
          productQuery.where(filter, value)
        }
      }
    }

    const products = await productQuery

    return response.ok({ data: products })
  }

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
