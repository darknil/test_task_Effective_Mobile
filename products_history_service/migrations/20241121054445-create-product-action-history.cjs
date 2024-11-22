'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Динамический импорт для использования Sequelize
    const { Sequelize: importedSequelize } = await import('sequelize')
    const { STRING, INTEGER, DATE, literal } = importedSequelize

    await queryInterface.createTable('product_action_histories', {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      plu: {
        type: STRING,
        allowNull: false
      },
      name: {
        type: STRING,
        allowNull: true
      },
      shop_id: {
        type: INTEGER,
        allowNull: true
      },
      action: {
        type: STRING,
        allowNull: false
      },
      quantity_on_shelf: {
        type: INTEGER,
        allowNull: true
      },
      quantity_in_order: {
        type: INTEGER,
        allowNull: true
      },
      date: {
        type: DATE,
        allowNull: false
      },
      createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('product_action_histories')
  }
}
