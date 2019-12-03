const express = require('express');
const router = express.Router();

const clienteController = require('../controller/clienteController');
const productosController = require('../controller/productosController');
const pedidosController = require('../controller/pedidosController');
const usuariosController= require('../controller/usuariosController');

const auth = require('../middleware/auth');

module.exports = function(){
    
    //CLIENTES
    router.post('/clientes',auth, clienteController.nuevoCliente);

    router.get('/clientes', auth, clienteController.mostrarClientes);

    router.get('/clientes/:idCliente',auth, clienteController.mostrarCliente);

    router.put('/clientes/:idCliente',auth, clienteController.actualizarCliente);

    router.delete('/clientes/:idCliente',auth, clienteController.eliminarCliente);



    //PRODUCTOS
    router.post('/productos',auth, productosController.subirArchivo , productosController.nuevoProducto);

    router.get('/productos',auth, productosController.mostrarProductos);

    router.get('/productos/:idProducto', auth, productosController.mostrarProducto);

    router.put('/productos/:idProducto',auth, productosController.subirArchivo, productosController.actualizarProducto );

    router.delete('/productos/:idProducto', auth,productosController.eliminarProducto);


    router.post('/productos/busqueda/:query', productosController.buscarProducto);

    //PEDIDOS
    router.post('/pedidos/nuevo/:idUsuario',auth, pedidosController.nuevoPedido);

    router.get('/pedidos',auth, pedidosController.mostrarPedidos);

    router.get('/pedidos/:idPedido',auth, pedidosController.mostrarPedido);

    router.put('/pedidos/:idPedido',auth,pedidosController.actualizarPedido);

    router.delete('/pedidos/:idPedido',auth, pedidosController.eliminarPedido);


    //USUARIOS
    router.post('/crear-cuenta', usuariosController.registrarUsuario );

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);
    
    return router;
}