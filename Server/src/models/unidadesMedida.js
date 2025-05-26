const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('UnidadMedida', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    simbolo: {
      type: DataTypes.STRING,
      allowNull: false, // El símbolo es obligatorio
    },
    factor_conversion: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false, // El factor de conversión es obligatorio
      defaultValue: 1.0, // Valor por defecto para unidades base
    },
  }, {
    tableName: 'unidades_medida',
    timestamps: false, // No se necesitan created_at ni updated_at
  });
};