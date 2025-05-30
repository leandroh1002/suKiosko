const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // Asegúrate de configurar tu conexión a la base de datos

module.exports = (sequelize) => {
  sequelize.define('MovimientoStock', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos', // Nombre de la tabla relacionada
      key: 'id',
    },
  },
  tipo: {
    type: DataTypes.ENUM('entrada', 'salida', 'ajuste'),
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motivo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'movimientos_stock',
  timestamps: false, // No se necesitan created_at ni updated_at
});
}