const express = require('express');
const routes = express.Router();

const controller = require('../controllers/controllers');

routes.get('/api/articulos', controller.getArticulos);
routes.post('/api/articulos', controller.setArticulos);
routes.delete('/api/articulos/:id', controller.deleteArticulo);
routes.put('/api/articulos/:id', controller.actualizarArticulo);
routes.get('/api/bodega', controller.getBodega);
routes.post('/api/bodega', controller.setBodega);
routes.post('/api/mover/articulo/:idArticuloDesde/:idBodegaDesde/:idBodegaA', controller.moverArticulo);
routes.get('/api/ver/logs', controller.verLogs);

module.exports = routes;