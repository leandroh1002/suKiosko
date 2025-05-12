

const fs = require('fs');
const path = require('path');

const {
    DB_USER, DB_PASSWORD, DB_HOST, DIALECT_OPTIONS, SSL, DB_NAME
} = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    {
        logging: false,
        native: false,
        dialect: 'postgres',
        ssl: SSL,
        define: {
            freezeTableName: true,
            timestamps: false,
        },
        dialectOptions: JSON.parse(DIALECT_OPTIONS),
        query: {
            raw: false, // Establece raw: true globalmente
        },
    }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { MovimientoStock, DetalleVenta, Producto, Rubro, Venta, Empleado, Cliente } = sequelize.models;

// Relaciones
// Rubros y Productos (Uno-a-Muchos)
Rubro.hasMany(Producto, { foreignKey: 'rubro_id' }); //Un rubro puede tener muchos productos
Producto.belongsTo(Rubro, { foreignKey: 'rubro_id' }); //Cada producto pertenece a un rubro.

// Ventas y DetalleVenta (Uno-a-Muchos)
Venta.hasMany(DetalleVenta, { foreignKey: 'venta_id' }); //Una venta puede tener muchos detalles de venta.
DetalleVenta.belongsTo(Venta, { foreignKey: 'venta_id' });// Cada detalle de venta pertenece a una venta

// Productos y DetalleVenta (Uno-a-Muchos)
Producto.hasMany(DetalleVenta, { foreignKey: 'producto_id' }); //Un producto puede aparecer en muchos detalles de venta
DetalleVenta.belongsTo(Producto, { foreignKey: 'producto_id' });//Cada detalle de venta está asociado a un producto

// Ventas y Empleados (Uno-a-Muchos)
Empleado.hasMany(Venta, { foreignKey: 'empleado_id' });//Un empleado puede realizar muchas ventas
Venta.belongsTo(Empleado, { foreignKey: 'empleado_id' });//Cada venta está asociada a un empleado

// Ventas y Clientes (Uno-a-Muchos, con cliente opcional)
Cliente.hasMany(Venta, { foreignKey: 'cliente_id' });//Un cliente puede realizar muchas ventas
Venta.belongsTo(Cliente, { foreignKey: 'cliente_id' });//Cada venta puede estar asociada a un cliente (opcional).

// Productos y MovimientosStock (Uno-a-Muchos)
Producto.hasMany(MovimientoStock, { foreignKey: 'producto_id' });//Un producto puede tener muchos movimientos de stock
MovimientoStock.belongsTo(Producto, { foreignKey: 'producto_id' });//Cada movimiento de stock está asociado a un producto

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
