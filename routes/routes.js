const express = require('express');
const router = express.Router();

const clienteController = require('../controller/clienteController');
const productosController = require('../controller/productosController');

module.exports = function(){
    
    //CLIENTES
    router.post('/clientes', clienteController.nuevoCliente);


    router.get('/clientes', clienteController.mostrarClientes);

    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);



    //PRODUCTOS
    router.post('/productos', productosController.subirArchivo , productosController.nuevoProducto);

    router.get('/productos', productosController.mostrarProductos);

    return router;
}