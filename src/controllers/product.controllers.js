const productCtrl = {};

const Product = require('../models/ProductModel');

//Obtener lista de productos

productCtrl.getProducts = async (req, res) => {
    const result = await Product.getProducts();
    res.json(result);
};

//Obtener un solo  productos

productCtrl.getProduct = async (req, res) => {
    const {sku} = req.params;
    const result = await Product.getProduct(sku);
    console.log(sku);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({message: 'Producto no encontrado'});
    }
};

//Crear producto

productCtrl.createProduct = async (req, res) => {
    const { sku, nombre, precio, url, marca, descripcion, iva, descuento, inventario, fecha_creacion} = req.body;
    const product = {
        sku: sku,
        nombre: nombre,
        precio: precio,
        url: url,
        marca: marca,
        descripcion : descripcion,
        iva: iva,
        descuento: descuento,
        inventario: inventario,
        fecha_creacion: fecha_creacion
    }
    const result = Product.saveProduct(product);
    if (result) {
        res.json({message: 'Producto guardado'});
    } else {
        res.status(500).json({message: 'El producto ya existe'});
    }
};

//Eliminar producto

productCtrl.deleteProduct = async (req, res) => {
    const {sku} = req.params;
    const product = {
        sku: sku
    }
    const result = Product.deleteProduct(product);
    if (result) {
        res.json({message: 'Producto Eliminado'});
    } else {
        res.status(500).json({message: 'Producto no encontrado'});
    }
};

//Actualizar producto

productCtrl.updateProduct = async (req, res) => {
    const {sku} = req.params;
    const { nombre, precio, url, marca, descripcion, iva, descuento, inventario, fecha_creacion} = req.body;
    const product = {
        sku: sku,
        nombre: nombre,
        precio: precio,
        url: url,
        marca: marca,
        descripcion : descripcion,
        iva: iva,
        descuento: descuento,
        inventario: inventario,
        fecha_creacion: fecha_creacion
    }
    const result = Product.updateProduct(product);
    if (result) {
        res.json({message: 'Producto actualizado'});
    } else {
        res.status(500).json({message: 'Producto no encontrado'});
    }
};



module.exports = productCtrl;
