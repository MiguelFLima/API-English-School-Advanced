const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router
  .post('/pessoas/:estudanteId/cancela', PessoaController.cancelStudent)
  .get('/pessoas/todos', PessoaController.getAllPeople)
  .get('/pessoas/:id', PessoaController.getAPerson)
  .get('/pessoas', PessoaController.getAllActivePeople)
  .post('/pessoas', PessoaController.createPerson)
  .put('/pessoas/:id', PessoaController.updatePerson)
  .delete('/pessoas/:id', PessoaController.deleteAPerson)
  .post('/pessoas/restaurar/:id', PessoaController.restoreAPerson)
  .get('/pessoas/matricula/lotada', PessoaController.getFullClasses)
  .get(
    '/pessoas/matriculas/:turmaId/confirmados',
    PessoaController.getMatriculasPerClass
  )
  .get(
    '/pessoas/:estudanteId/matriculas/:matriculaId',
    PessoaController.getOneMatricula
  )

  .get(
    '/pessoas/:estudanteId/matriculas',
    PessoaController.getAllMatriculasFromAStudent
  )

  .post('/pessoas/:estudanteId/matriculas', PessoaController.createAMatricula)

  .put(
    '/pessoas/:estudanteId/matriculas/:matriculaId',
    PessoaController.updateAMatriculaFromAStudent
  )

  .delete(
    '/pessoas/:estudanteId/matriculas/:matriculaId',
    PessoaController.deleteAMatricula
  )

  .post(
    '/pessoas/:estudanteId/matriculas/:matriculaId',
    PessoaController.restoreAMatricula
  );

module.exports = router;
