const { Schema, model } = require('mongoose');

const articulo = new Schema({
  nombre: { 
     type: String,
     required: true,
     maxlength: 100,
     minlength: 3
   },
   descripcion: {
     type: String,
     required: true
   },
   codigo_articulo: {
     type: Number,
     required: true
   },
   creado_en:{
     type: Date, default: Date.now
   }
});

module.exports = model('articulo', articulo);