const Pedidos = require('../models/Pedidos');

//Crear Pedido
exports.nuevoPedido = async(req,res,next) => {
    const pedido = new Pedidos(req.body);
    try{
        await pedido.save();
        res.json({mensaje: "se agrego nuevo pedido"});
    } catch (error) {
        console.log(error);
        next();
    }
};

//mostrar todos los pedidos
exports.mostrarPedidos = async(req,res,next) => {
    try {                                             //la referencia a mi campo  
        const pedidos = await Pedidos.find().populate('cliente').populate({
            path: 'pedido.producto', //donde se encuentra ese producto en nuestra referencia
            model: 'Productos' //referencia al modelo
        });

        res.json(pedidos);
    } catch(error) {
        console.log(error);
        next();
    }
}

//mostrar un pedido
exports.mostrarPedido = async(req, res, next) => {
   
    try{
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto', //donde se encuentra ese producto en nuestra referencia
        model: 'Productos' //referencia al modelo
    });

    //mostrar pedido
    res.json(pedido);
    
    } catch (error) { 
        console.log(error); 
        res.json({mensaje: error});
        next(); }
    
    }

//actualizar un pedido
exports.actualizarPedido = async(req,res,next) => {
    try{
        let pedido = await Pedidos.findByIdAndUpdate(req.params.idPedido, req.body);
        res.json(pedido);
        
    } catch(error) {
        console.log(error);
        next();
    }
}    