const Articulo = require('../models/articulo');
const Bodega = require('../models/bodega');
const Log = require('../models/logs');

const bodega = {};

bodega.getArticulos = async (req, res) => {
  const articulos = await Articulo.find();
  res.json(
    articulos
  )
};

bodega.setArticulos = async (req, res) => {

   const articulo = new Articulo();

   articulo.nombre = req.body.nombre
   articulo.descripcion = req.body.descripcion
   articulo.total_bodega = req.body.total_bodega
   articulo.codigo_articulo = req.body.codigo_articulo
   articulo.id_bodega = req.body.id_bodega

   // Valida que no haya inventario negativo
   const validar_articulo = await Articulo.findOne({codigo_articulo: req.body.codigo_articulo});
   const validar_bodega = await Articulo.findOne({id_bodega: req.body.id_bodega});

   console.log(validar_bodega, validar_articulo);

   if(validar_articulo !== null && validar_bodega === null || validar_articulo === null && validar_bodega === null){
      await articulo.save();
      console.log('entro');
   }else{
      res.json({
         message: "Este produto ya se encuentra registrado en la bodega."
      })
   }

   res.json(articulo);
};

bodega.deleteArticulo = async (req, res) => {
    const articulo_eliminado = await Articulo.findByIdAndRemove(req.params.id);
    res.json(articulo_eliminado);
};

bodega.actualizarArticulo = async (req, res) => {
   await Articulo.findOneAndUpdate({_id:req.params.id},req.body,{new:true}, (err, data) => {
      res.json(
        data
      )
  });
};

bodega.getBodega = async (req, res) => {
   const bodega = await Bodega.find();
   res.json(bodega);
};

bodega.setBodega = async (req, res) => {
   const bodega = new Bodega();
   bodega.nombre_bodega = req.body.nombre_bodega

   await bodega.save();

   res.json(
      bodega
   )
}

bodega.moverArticulo = async (req, res) => {

   const articuloDesde = await Articulo.findOne({_id: req.params.idArticuloDesde});

   const articuloA = await Articulo.findOne({
      codigo_articulo: articuloDesde.codigo_articulo, 
      id_bodega: req.params.idBodegaA
   });

   const reducir = articuloDesde.total_bodega - req.body.cantidad;
   const aumentar = articuloA.total_bodega + req.body.cantidad;

   // se envia el id y la cantidad para actualiza el total de bodega
   actualizarArticulo(req.params.idArticuloDesde, reducir);
   actualizarArticulo(req.params.idArticuloA, aumentar);
   //final del actualizado

   // se busca la bodega por id
   const bodegaDesde = await Bodega.findOne({_id: articuloDesde.id_bodega});
   const bodegaA = await Bodega.findOne({_id: articuloA.id_bodega})
   //final del busqueda
   
   // se guardas los datos en la coleccion logs.js
   const log = new Log();
   log.bodega_origen = bodegaDesde.nombre_bodega
   log.id_bodega_origen = bodegaDesde._id
   log.bodega_destino = bodegaA.nombre_bodega
   log.id_bodega_destino = bodegaA._id
   log.producto = articuloDesde.nombre
   log.producto_descripcion = articuloDesde.descripcion
   log.numero_unidades_transferidas = req.body.cantidad
   log.save();
   //final del guardado
  
   res.json({
      message: "Articulo movido con éxito!"
   })
}

// funcion encarga de actualizar la cantidad en bodega del articulo
const actualizarArticulo = async (id, cantidad) => {
   console.log(id, cantidad);
   await Articulo.findOneAndUpdate({_id: id},{total_bodega: cantidad}, {new: false}, (err, data) => {
   });
}
//final del actualizado

module.exports = bodega;