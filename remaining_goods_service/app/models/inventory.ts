import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Inventory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare PLU: string

  @column()
  declare shop_id: number

  @column()
  declare quantity_on_shelf: number

  @column()
  declare quantity_in_order: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
