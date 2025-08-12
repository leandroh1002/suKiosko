const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // Asegúrate de configurar tu conexión a la base de datos

module.exports = (sequelize) => {
sequelize.define('DetalleVenta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  venta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ventas', // Nombre de la tabla relacionada
      key: 'id',
    },
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos', // Nombre de la tabla relacionada
      key: 'id',
    },
  },
  cantidad: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  redondeo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  precio_compra: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  subtotal_compra: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'detalle_venta',
  timestamps: false, // No se necesitan created_at ni updated_at
});
};