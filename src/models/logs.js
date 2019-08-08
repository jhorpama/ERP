const { Schema, model } = require('mongoose');

const log = ({
   bodega_origen: {
     type: String,
     required: true
   },
   id_bodega_origen: {
     type: String,
     required: true
   },
   bodega_destino: {
     type: String,
     required: true
   },
   id_bodega_destino: {
     type: String,
     required: true
   },
   producto: {
     type: String,
     required: true
   },
   producto_descripcion: {
      type: String,
      required: true
   },
   numero_unidades_transferidas: {
       type: Number,
       required: true
   },
   creado_en: {
     type: Date, default: Date.now
   }
});

module.exports = model('log', log);