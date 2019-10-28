const Productos = require('../models/Productos');


//confiiguracion multer
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage : fileStorage = multer.diskStorage({
        destination: (req, file,cb) =>{
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req,file,cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype ===  'image/png') {
            cb(null, true);
        }else {
            cb(new Error('Formato no valido'));
        }
    }

}

//pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');


//sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req,res, function(error){
        if(error){
            res.json({mensaje: error});
        }
        return next();
    })
} 



//agregar productos
exports.nuevoProducto = async(req, res, next) => {
    const producto = new Productos(req.body);

    try{
        if(req.file.filename){ //si hay algun archivo
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({mensaje: "guardado producto"})
    }catch(error){
        console.log(error);
        next();
    }
}


//mostrar productoS
exports.mostrarProductos = async(req,res,next)=> {
    try{
        const productos = await Productos.find();
        res.json(productos);
    }catch(error){
        console.log(error);
        next();
    }
}


//mostrar un producto
exports.mostrarProducto = async (req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if(!producto) {
        res.json({mensaje: "producto inexistente"});
        return next();
    }
    res.json(producto);
}

//actualizar un producto por id
exports.actualizarProducto = async(req,res,next) => {
    try{

        let productoAnterior = await Productos.findById(req.params.idProducto);

        //construir un nuevo producto
        let nuevoProducto = req.body;

        //verificar si hay imagen nueva
        if(req.file) {
            nuevoProducto.imagen = req.file.filename;
        }else {
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findByIdAndUpdate(req.params.idProducto ,
           nuevoProducto ,{
               new: true
           } );
        res.json(producto);
    }catch(error){
        console.log(error);
        next();
    }
}

//elimina un producto por id
exports.eliminarProducto = async(req, res, next) => {
    try {
        await Productos.findByIdAndDelete(req.params.idProducto);
        res.json({mensaje:"producto eliminado"});
    }catch (error){
        console.log(error);
        next();
    }
}



//
exports.buscarProducto = async (req, res, next) => {
    try{
        //obtener el query
        const {query} = req.params;
        const producto = await Productos.find({nombre: new RegExp(query, 'i')}); //la i es para que no importe mayusculas o minusculas
        res.json(producto);

    }catch(error){
        console.log(error);
        next();
    }
}