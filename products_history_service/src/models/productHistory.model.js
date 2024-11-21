import { DataTypes } from 'sequelize'
import sequelize from '../db/db.js'

const ProductActionHistory = sequelize.define(
  'ProductActionHistory',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    plu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'product_action_histories',
    timestamps: false
  }
)

export default ProductActionHistory
