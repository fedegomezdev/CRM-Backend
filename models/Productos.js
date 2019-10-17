const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    nombre : {
        type: String,
        trim: true
    },
    precio: Number,
    imagen: String
});

module.exports = mongoose.model('Productos', productosSchema);