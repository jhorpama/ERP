const { Schema, model } = require('mongoose');

const bodega = new Schema({
    nombre_bodega: {
        type: String,
        required: true
    },
    creado_en: {
        type: Date, default: Date.now
    }
});

module.exports = model('bodega', bodega);