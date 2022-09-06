const OrderModel = {};
const path = require('path');
const fs = require('fs');

let Datapath = path.join(__dirname, "../data/Order.json");

//Función crear orden de compra

OrderModel.create = async (order) => {
    // Validar si el archivo existe
    if (!fs.existsSync(Datapath)) {
        // Crear archivo
        fs.writeFileSync(Datapath, JSON.stringify([order]));
        return true;
    } else {
        let id = order.id;
        let rawdata = fs.readFileSync(Datapath);
        let orders = JSON.parse(rawdata);
        let arrOrders = orders;
        let orderExists = arrOrders.find((order) => order.id === id);
        if (orderExists) {
            return false;
        } else {
            save(order, Datapath);
            return true;
        }
    }
}

//Función numero de orden, validacion de id

OrderModel.getOrdersLength = async () => {  
    // Validar si el archivo existe
    if (!fs.existsSync(Datapath)) {
        return 0;
    } else {
        let rawdata = fs.readFileSync(Datapath);
        let orders = JSON.parse(rawdata);
        return orders.length;
    }

}

//Función numero de orden, validacion de id

OrderModel.getordenes = async () => {  

    let rawdata = fs.readFileSync(Datapath);
    let ordenes = JSON.parse(rawdata);
    return ordenes;

}

//Función auxiliar de guardar 

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

module.exports = OrderModel;