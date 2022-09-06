const express = require('express');
const app = express();

// Importacion de rutas
const productRoutes = require('./routes/product.routes');
const productTotalPriceRoutes = require('./routes/productTotalPrice.routes');
const orderRoutes = require('./routes/order.routes');

// Middleware
app.use(express.json());

// Rutas Principales
app.use('/admin/producto', productRoutes); 
app.use('/producto', productTotalPriceRoutes);
app.use('/', orderRoutes);

module.exports = app;
