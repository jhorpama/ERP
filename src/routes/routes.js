const express = require('express');
const routes = express.Router();

const controller = require('../controllers/controllers');

router.get('/api/articulos', controller.getArticulos);