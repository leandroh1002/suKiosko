const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // Asegúrate de configurar tu conexión a la base de datos

module.exports = (sequelize) => {sequelize.define('Venta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  medio_pago: {
    type: DataTypes.ENUM('efectivo', 'transferencia', 'tarjeta'),
    allowNull: false,
  },
  ganancia_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  empleado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empleados', // Nombre de la tabla relacionada
      key: 'id',
    },
  },
  anulada: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'clientes', // Nombre de la tabla relacionada
      key: 'id',
    },
  },
}, {
  tableName: 'ventas',
  timestamps: false, // Si no necesitas createdAt y updatedAt automáticos
});}