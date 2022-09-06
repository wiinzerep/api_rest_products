// Modelo del producto en archivo Json

const fs = require("fs");
const path = require("path");

let Datapath = path.join(__dirname, "../data/Products.json");

console.log(Datapath);
const ProductsModel = {};

//Funcion listar productos

ProductsModel.getProducts = () => {  
  // leer el archivo de data
  let rawdata = fs.readFileSync(Datapath);
  let products = JSON.parse(rawdata);
  return products;
};

//Función listar producto por sku

ProductsModel.getProduct = (sku) => { 
  // leer el archivo de data
  let rawdata = fs.readFileSync(Datapath);
  let products = JSON.parse(rawdata);
  let arrProdcuts = products;
  console.log(arrProdcuts);
  let getProduct = arrProdcuts.find((product) => product.sku === sku);

  return getProduct;
};

//Función guardar productos

ProductsModel.saveProduct = (product) => {  
  //validar si el archivo existe
  if (!fs.existsSync(Datapath)) {
    // Crear el archivo
    fs.writeFileSync(Datapath, JSON.stringify([product]));
    return true;
  } else {
    let sku = product.sku;
    let rawdata = fs.readFileSync(Datapath);
    let products = JSON.parse(rawdata);
    let arrProdcuts = products;
    let productExists = arrProdcuts.find((product) => product.sku === sku);
    if (productExists) {
      return false;
    } else {
      save(product, Datapath);
      return true;
    }
  }
};

//Función eliminar productos

ProductsModel.deleteProduct = (product) => {  
  let sku = product.sku;
  let rawdata = fs.readFileSync(Datapath);
  let products = JSON.parse(rawdata);
  let arrProdcuts = products;
  let productExists = arrProdcuts.find((product) => product.sku === sku);
  if (productExists) {
    deleteItem(product, Datapath);
    return true;
  } else {
    return false;
  }
};

//Función actualizar productos

ProductsModel.updateProduct = (product) => {  
    let sku = product.sku;
    let rawdata = fs.readFileSync(Datapath);
    let products = JSON.parse(rawdata);
    let arrProdcuts = products;
    let productExists = arrProdcuts.find((product) => product.sku === sku);
    if (productExists) {
        updateItem(product, Datapath);
        return true;
    } else {
        return false;
    }
};

//Función auxiliar para guardar

function save(item, path) {   
  if (!fs.existsSync(path)) {
    fs.writeFile(path, JSON.stringify([item]));
  } else {
    var data = fs.readFileSync(path, "utf8");
    var list = data.length ? JSON.parse(data) : [];
    if (list instanceof Array) list.push(item);
    else list = [item];
    fs.writeFileSync(path, JSON.stringify(list));
  }
}

//Función auxiliar para eliminar

function deleteItem(item, path) {
  var data = fs.readFileSync(path, "utf8");
  var list = data.length ? JSON.parse(data) : [];
  if (list instanceof Array) {
    list = list.filter(function (e) {
      return e.sku !== item.sku;
    });
  }
  fs.writeFileSync(path, JSON.stringify(list));
}

//Función actualizar productos

function updateItem(item, path) {
  var data = fs.readFileSync(path, "utf8");
  var list = data.length ? JSON.parse(data) : [];
  if (list instanceof Array) {
    list = list.filter(function (e) {
      return e.sku !== item.sku;
    });
    list.push(item);
  }
  fs.writeFileSync(path, JSON.stringify(list));
}

module.exports = ProductsModel;
