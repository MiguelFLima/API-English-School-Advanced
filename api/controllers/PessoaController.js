const database = require('../models');
const Sequelize = require('sequelize');

const { PessoasServices } = require('../services');
const pessoasServices = new PessoasServices();

class PessoaController {
  static async getAllActivePeople(req, res) {
    try {
      const allActivePeople = await pessoasServices.pegaRegistrosAtivos();
      return res.status(200).json(allActivePeople);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async getAllPeople(req, res) {
    try {
      const allPeople = await pessoasServices.pegaTodosOsRegistros();
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async getAPerson(req, res) {
    const { id } = req.params;

    try {
      const aPerson = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(aPerson);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async createPerson(req, res) {
    const newPerson = req.body;

    try {
      const personCreated = await database.Pessoas.create(newPerson);
      return res.status(201).json(personCreated);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  static async updatePerson(req, res) {
    const { id } = req.params;
    const newInfo = req.body;

    try {
      await database.Pessoas.update(newInfo, {
        where: { id: Number(id) },
      });
      const personUpdated = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(personUpdated);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async deleteAPerson(req, res) {
    const { id } = req.params;

    try {
      await database.Pessoas.destroy({
        where: { id: Number(id) },
      });
      return res.status(200).json(`Usuário ${id} deletado`);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async restoreAPerson(req, res) {
    const { id } = req.params;

    try {
      await database.Pessoas.restore({
        where: { id: Number(id) },
      });

      return res.status(200).json({ mensagem: `id ${id} restaurado!` });
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  // Get one Matricula
  static async getOneMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const matricula = await database.Matriculas.findOne({
        where: { estudante_id: Number(estudanteId), id: Number(matriculaId) },
      });
      return res.status(200).json(matricula);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  // Matriculas of one person
  static async getAllMatriculasFromAStudent(req, res) {
    try {
      const { estudanteId } = req.params;
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(estudanteId) },
      });
      const matriculas = await pessoa.getAulasMatriculadas();
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  // Create A matricula To A Student
  static async createAMatricula(req, res) {
    try {
      const { estudanteId } = req.params;
      const matriculaInfo = { ...req.body, estudante_id: Number(estudanteId) };
      const newMatricula = await database.Matriculas.create(matriculaInfo);
      return res.status(201).json(newMatricula);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  // Update A Matricula From a Student
  static async updateAMatriculaFromAStudent(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const newInfo = req.body;
      await database.Matriculas.update(newInfo, {
        where: { id: Number(matriculaId), estudante_id: estudanteId },
      });
      const updatedMatricula = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });
      return res.status(200).json(updatedMatricula);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  // Delete A Matricula From A Student
  static async deleteAMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      await database.Matriculas.destroy({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });
      return res.status(200).json({
        message: `Mátricula ${matriculaId}  foi excluída com sucesso`,
      });
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async restoreAMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      await database.Matriculas.restore({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });
      return res.status(200).json({
        message: `Matrícula ${matriculaId}  foi restaurada com sucesso`,
      });
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async getMatriculasPerClass(req, res) {
    const { turmaId } = req.params;
    try {
      const matriculas = await database.Matriculas.findAndCountAll({
        where: { turma_id: Number(turmaId), status: 'confirmado' },
        limit: 20,
        order: [['estudante_id', 'ASC']],
      });
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async getFullClasses(req, res) {
    const isFull = 2;
    try {
      const fullClasses = await database.Matriculas.findAndCountAll({
        where: { status: 'confirmado' },
        group: ['turma_id'],
        having: Sequelize.literal(`count(turma_id) >= ${isFull}`),
      });
      return res.status(200).json(fullClasses.count);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async cancelStudent(req, res) {
    const { estudanteId } = req.params;
    try {
      await pessoasServices.cancelaPessoaEMatricula(Number(estudanteId));
      return res
        .status(200)
        .json({ message: `Matrículas referentes ${estudanteId} canceladas` });
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }
}

module.exports = PessoaController;

// Minha versão de todas as matriculas de um estudante

// static async getAllMatriculasFromAStudent(req, res) {
//   try {
//     const { estudanteId } = req.params;
//     const matriculas = await database.Matriculas.findAll({
//       where: { estudante_id: Number(estudanteId) },
//     });
//     return res.status(200).json(matriculas);
//   } catch (error) {
//     return res.status(500).json(error.mensagem);
//   }
// }
