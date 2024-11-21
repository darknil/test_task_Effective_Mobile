'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Динамический импорт для использования Sequelize
    const { Sequelize: importedSequelize } = await import('sequelize');
    const { STRING, INTEGER, DATE, literal } = importedSequelize;

    await queryInterface.createTable('product_action_histories', {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      plu: {
        type: STRING,
        allowNull: false,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      shop_id: {
        type: INTEGER,
        allowNull: true,
      },
      action: {
        type: STRING,
        allowNull: false,
      },
      date: {
        type: DATE,
        allowNull: false,
      },
      createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('product_action_histories');
  }
};