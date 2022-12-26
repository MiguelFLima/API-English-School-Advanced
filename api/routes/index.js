const bodyParser = require('body-parser');
const pessoas = require('./pessoasRoute');
const turmas = require('./turmaRoute');
const niveis = require('./nivelRoute');
const matriculas = require('./matriculaRoute');

module.exports = (app) => {
  app.use(bodyParser.json(), pessoas, niveis, turmas, matriculas);
};
