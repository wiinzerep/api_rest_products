const orderCtrl = {};

const { response } = require('express');
const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');

//Función comprar

orderCtrl.comprar = async (req, res) => {
    const { nombre, apellido, productos } = req.body;
    let id = await Order.getOrdersLength() + 1; 
    console.log(productos);
    const checkProducts = Product.getProducts().filter(product => productos.includes(product.sku));
    if (checkProducts.length === productos.length) {
        let prices = Product.getProducts().map(product => {
            if (productos.includes(product.sku)) {
                let finalPrice = product.precio - (product.precio * product.descuento / 100) + (product.precio * product.iva / 100);
                return finalPrice
            }
        }, 0);
        // borrar valores indefinidos
        prices = prices.filter(price => price !== undefined);
        let total = prices.reduce((a, b) => a + b, 0);
        console.log(total);
        const order = {
            id,
            nombre,
            apellido,
            total,
            productos,
        }
        await Order.create(order);
        res.json({
            message: 'Compra exitosa',
        });
    } else {
        res.json({
            message: 'No se pudo realizar la compra',
        });
    }
}

// Función resumen de la compra 

orderCtrl.resumen = async  (req, res) => {

    res.json ({mensaje : "hello" })
}

// Función consultar ordenes de compra

orderCtrl.ordenes = async  (req, res) => {
    const result = await Order.getordenes()
    console.log|(result)
    res.json (result)
}

module.exports = orderCtrl;
        