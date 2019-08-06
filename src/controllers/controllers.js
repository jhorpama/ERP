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

   // Validar que no haya inventario negativo
   const validar_articulo = await Articulo.findOne({codigo_articulo: req.body.codigo_articulo});

   console.log(validar_articulo);
   if(validar_articulo === null){
      await articulo.save();
   }else{
      res.json({
         message: "Este produto ya se encuentra registrado en la base de datos"
      })
   }
   
   res.json(articulo);
};

bodega.deleteArticulo = async (req, res) => {
    console.log(req.params.id);
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

module.exports = bodega;