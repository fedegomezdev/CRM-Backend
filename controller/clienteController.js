const Clientes = require('../models/Clientes');

exports.nuevoCliente = async (req,res, next) => {
    const { nombre, apellido, empresa, telefono, email } = req.body;
    const cliente = new Clientes({
        nombre,
        apellido,
        empresa,
        telefono,
        email
    });

    try{
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'});
    }catch (error) {
        console.log(error);
        next();
    }
    
};

exports.mostrarClientes = async(req,res, next) => {
    try{
        const clientes = await Clientes.find();
        res.json(clientes);
    }catch(error) {
        console.log(error);
        next();
    }
}

exports.mostrarCliente = async(req, res, next ) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    if(!cliente) {
        res.json({mensaje: "Cliente no existe"});
        next();
    }
    res.json(cliente);
}

exports.actualizarCliente = async(req, res, next) => {
    const {nombre, apellido, telefono, email, empresa} = req.body;
    try{
        const cliente = await Clientes.findByIdAndUpdate(req.params.idCliente ,{
            nombre,
            apellido,
            email,
            telefono,
            empresa
        }); 
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarCliente = async(req, res, next) => {
    try{
        await Clientes.findByIdAndDelete(req.params.idCliente);
        res.json({mensaje: "cliente eliminado"});
    } catch (error) {
        console.log(error);
        next();
    }
}