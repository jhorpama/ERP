const { Schema, model } = require('mongoose');

const bodega = new Schema({
    nombre_bodega: {
        type: String,
        required: true
    }
});