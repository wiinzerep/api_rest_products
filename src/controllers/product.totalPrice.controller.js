const productTotalPriceCtrl = {};

const Product = require('../models/ProductModel');

//Función calcula total producto

productTotalPriceCtrl.getProductTotalPrice = (req, res) => {
    let result = Product.getProducts().map(product => {
        if (product.inventario > 0) {
            let finalPrice = product.precio - (product.precio * product.descuento / 100) + (product.precio * product.iva / 100);
            return {
                sku: product.sku,
                nombre: product.nombre,
                url: product.url,
                marca: product.marca,
                price: finalPrice,
            }
        }
    });
    result = result.filter(item => item !== undefined);
    res.json(result);
}

//Función calcula total de un solo producto

productTotalPriceCtrl.getProductTotalPriceBySku = (req, res) => {
    const sku = req.params.sku;
    let result = Product.getProducts().map(product => {
        if (product.sku === sku && product.inventario > 0) {
            let finalPrice = product.precio - (product.precio * product.descuento / 100) + (product.precio * product.iva / 100);
            return {
                sku: product.sku,
                nombre: product.nombre,
                url: product.url,
                marca: product.marca,
                price: finalPrice,
            }
        }
    });
    result = result.filter(item => item !== undefined);
    console.log(result)
    res.json(result);
    
}

module.exports = productTotalPriceCtrl;