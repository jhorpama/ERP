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

   await articulo.save();

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