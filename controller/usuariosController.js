const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.registrarUsuario = async (req, res) => {

    // leer los datos del usuario y colocarlos en Usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 10, null);
    try {
        await usuario.save();
        res.json({mensaje : 'Usuario Creado Correctamente'});
    } catch (error) {
        console.log(error);
        res.json({mensaje : 'Hubo un error'});
    }
    
}

 exports.autenticarUsuario = async(req,res,next) => {
    const usuario = await Usuarios.findOne({email : req.body.email});

    if(!usuario){
        //si usuario no existe
        await res.status(401).json({mensaje:"usuario no existe"});
        next();
    }else {
        //comparar password para ver si es correcta
        if(!bcrypt.compareSync(req.body.password, usuario.password)){
            res.status(401).json({mensaje:"password incorrecta"})
            next();
        } else {
            //password correcto, crea un token
            const token = jwt.sign({
                nombre: usuario.nombre,
                email:usuario.email,
                id:usuario._id
            },'secretkey', {expiresIn:'5h'});
            //retorno mi token
            res.json({token});
        }
    }
 };