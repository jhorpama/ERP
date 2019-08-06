const express = require('express');
const routes = express.Router();

const controller = require('../controllers/controllers');

routes.get('/api/articulos', controller.getArticulos);
routes.post('/api/articulos', controller.setArticulos);
routes.delete('/api/articulos/:id', controller.deleteArticulo);
routes.put('/api/articulos/:id', controller.actualizarArticulo);

module.exports = routes;