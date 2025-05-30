const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // Asegúrate de configurar tu conexión a la base de datos

module.exports = (sequelize) => {sequelize.define('Empleado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Para evitar duplicados
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'empleados',
  timestamps: false, // No se necesitan created_at ni updated_at
});
}