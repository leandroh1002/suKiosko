const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Producto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
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
    stock: {
      type: DataTypes.DECIMAL(10, 2), // Cambiado a DECIMAL según tu especificación
      allowNull: true,
    },
    unidad_medida_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'unidades_medida', // Nombre de la tabla relacionada
        key: 'id',
      },
    },
    rubro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rubros', // Nombre de la tabla relacionada
        key: 'id',
      },
    },
    codigo_barra: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    vencimiento: {
      type: DataTypes.DATEONLY, // Usamos DATEONLY para no guardar la hora
      allowNull: true, // O false si es un campo obligatorio
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'productos', // Nombre de la tabla en la base de datos
    timestamps: true, // Sequelize manejará automáticamente created_at y updated_at
    underscored: true, // Convierte nombres de columnas a snake_case
  });
};