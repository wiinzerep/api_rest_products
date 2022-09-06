const { Router } = require('express');
const router = Router();

const productTotalPriceCtrl = require('../controllers/product.totalPrice.controller');

//Rutas del precio

router.get('/', productTotalPriceCtrl.getProductTotalPrice);
router.get('/:sku', productTotalPriceCtrl.getProductTotalPriceBySku);


module.exports = router;