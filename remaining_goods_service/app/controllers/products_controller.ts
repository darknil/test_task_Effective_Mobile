import type { HttpContext } from '@adonisjs/core/http'
import { AlreadyExistsException, NotFoundException } from '#exceptions/errors_exceptions'
import Product from '#models/product'
import {
  createProductValidator,
  updateProductValidator,
  NameQueryValidator,
} from '#validators/product'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

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
    try {
      const product = await Product.create(payload)
      return response.created({ message: 'Product created successfully', data: product })
    } catch (error) {
      throw new Error('Product creation error')
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const { PLU } = params
    if (!PLU) {
      throw new Error('PLU is required')
    }
    const product = await Product.findBy('plu', PLU)
    if (!product) {
      throw new NotFoundException('Product not found')
    }
    return response.ok({ data: product })
  }

  async showByName({ request, response }: HttpContext) {
    const name = decodeURIComponent(request.param('name'))
    const payload = await NameQueryValidator.validate({ name })
    if (!payload.name) {
      throw new Error('name is required')
    }
    const product = await Product.findBy('name', payload.name)
    if (!product) {
      throw new NotFoundException('Product not found')
    }
    return response.ok({ data: product })
  }
  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
