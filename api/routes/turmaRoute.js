const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

const router = Router();

router.get('/turmas/:id', TurmaController.getAClasse);
router.get('/turmas', TurmaController.getAllClasses);
router.post('/turmas/:id', TurmaController.restoreAClass);
router.post('/turmas', TurmaController.createAClasse);
router.put('/turmas/:id', TurmaController.updateAClasse);
router.delete('/turmas/:id', TurmaController.deleteAClasse);

module.exports = router;
