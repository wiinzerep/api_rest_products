const { Router } = require('express');
const router = Router();

// Importacion de controlador orden
const orderCtrl = require('../controllers/order.controllers');

// Rutas de ordenes

router.post('/comprar', orderCtrl.comprar);
router.post('/resumen', orderCtrl.resumen);
router.get('/admin/ordenes', orderCtrl.ordenes);

module.exports = router;