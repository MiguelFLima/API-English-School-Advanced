const Services = require('../services/Services');
const database = require('../models');

class PessoasServices extends Services {
  constructor() {
    super('Pessoas');
    this.matriculas = new Services('Matriculas');
  }

  async pegaRegistrosAtivos(where = {}) {
    return database[this.nomeDoModelo].findAll({ where: { ...where } });
  }

  async pegaTodosOsRegistros(where = {}) {
    return database[this.nomeDoModelo]
      .scope('All')
      .findAll({ where: { ...where } });
  }

  async cancelaPessoaEMatricula(estudanteId) {
    return database.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro({ ativo: false }, estudanteId, {
        transaction: transacao,
      });
      await this.matriculas.atualizaRegistro(
        { status: 'cancelado' },
        estudanteId,
        { transaction: transacao }
      );
    });
  }
}

module.exports = PessoasServices;
