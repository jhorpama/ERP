const { Schema, model } = require('mongoose');

const log = ({
   bodega_origen: {
     type: String,
     required: true
   },
   bodega_destino: {
     type: String,
     required: true
   },
   producto: {
     type: String,
     required: true
   },
   numero_unidades_transferidas: {
       type: Number,
       required: true
   }
});

module.exports = model('log', log);