const { Router } = require('express');
const NivelController = require('../controllers/NivelController');
const route = Router();

route.get('/niveis/:id', NivelController.getALevel);
route.get('/niveis', NivelController.getAllLevels);
route.post('/niveis', NivelController.uploadALevel);
route.post('/niveis/:id', NivelController.restoreALevel);
route.delete('/niveis/:id', NivelController.deleteALevel);
route.put('/niveis/:id', NivelController.updateALevel);

module.exports = route;
