const express = require('express');
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swagger.js");
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { ACCESS_CONTROL_ALLOW_ORIGIN } = process.env;
require('./db.js');
const server = express();
server.name = 'API';

// Analizar el cuerpo de las solicitudes HTTP
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));

// Middleware para registro de solicitudes
server.use(morgan('dev'));

// Configuración manual de CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ACCESS_CONTROL_ALLOW_ORIGIN); // Actualiza con el dominio permitido
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas principales
server.use('/', routes);

// Implementación de Swagger
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = {server};