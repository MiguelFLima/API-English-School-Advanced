const { Router } = require('express');
const MatriculaController = require('../controllers/MatriculaController');

const route = Router();

route.get('/matriculas/:id', MatriculaController.getAmatricula);
route.get('/matriculas', MatriculaController.getAllMatriculas);

module.exports = route;
