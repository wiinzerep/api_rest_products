const { Router } = require('express');

// Importacion de controlador producto
const productCtrl = require('../controllers/product.controllers');

const router = Router();

// Rutas del producto
router.get('/', productCtrl.getProducts); 
router.get('/:sku', productCtrl.getProduct);
router.post('/create', productCtrl.createProduct);
router.delete('/:sku', productCtrl.deleteProduct);
router.put('/:sku', productCtrl.updateProduct);

module.exports = router;