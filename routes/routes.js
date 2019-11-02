const express = require('express');
const router = express.Router();

const clienteController = require('../controller/clienteController');
const productosController = require('../controller/productosController');
const pedidosController = require('../controller/pedidosController');
const usuariosController= require('../controller/usuariosController');

const auth = require('../middleware/auth');

module.exports = function(){
    
    //CLIENTES
    router.post('/clientes', clienteController.nuevoCliente);

    router.get('/clientes', auth, clienteController.mostrarClientes);

    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);



    //PRODUCTOS
    router.post('/productos', productosController.subirArchivo , productosController.nuevoProducto);

    router.get('/productos', productosController.mostrarProductos);

    router.get('/productos/:idProducto', productosController.mostrarProducto);

    router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto );

    router.delete('/productos/:idProducto', productosController.eliminarProducto);


    router.post('/productos/busqueda/:query', productosController.buscarProducto);

    //PEDIDOS
    router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido);

    router.get('/pedidos', pedidosController.mostrarPedidos);

    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);


    //USUARIOS
    router.post('/crear-cuenta', usuariosController.registrarUsuario );

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

    return router;
}