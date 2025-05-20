const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // Asegúrate de configurar tu conexión a la base de datos

module.exports = (sequelize) => { sequelize.define('Rubro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Restringe nombres duplicados
  },
}, {
  tableName: 'rubros',
  timestamps: false, // No se necesitan created_at ni updated_at
});}