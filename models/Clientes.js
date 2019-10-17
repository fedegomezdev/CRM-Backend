const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    nombre: {
        type: String,
        trim: true   //para que mongoose me recorte si tengo espacios al inciio o final
    },
    apellido: {
        type:String,
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    telefono: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Clientes', clientesSchema);