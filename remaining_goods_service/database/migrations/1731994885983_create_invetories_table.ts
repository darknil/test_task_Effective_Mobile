import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invetories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('plu').unsigned().references('id').inTable('products')
      table.integer('shop_id').unsigned().references('shop_id').inTable('shops')
      table.integer('quantity_on_shelf').notNullable()
      table.integer('quantity_in_order').notNullable()
      table.timestamps()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
