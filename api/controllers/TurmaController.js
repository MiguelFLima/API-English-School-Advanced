const database = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class TurmaController {
  static async getAllClasses(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};
    data_inicial || data_final ? (where.data_inicio = {}) : null;
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;

    try {
      const classes = await database.Turmas.findAll({ where });
      return res.status(200).json(classes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getAClasse(req, res) {
    try {
      const { id } = req.params;
      const classe = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(classe);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createAClasse(req, res) {
    try {
      const classeInfo = req.body;
      const newClasse = await database.Turmas.create(classeInfo);
      return res.status(200).json(newClasse);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateAClasse(req, res) {
    try {
      const { id } = req.params;
      const newClasseInfo = req.body;
      await database.Turmas.update(newClasseInfo, {
        where: { id: Number(id) },
      });
      const classeUpdated = await database.Turmas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(classeUpdated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteAClasse(req, res) {
    try {
      const { id } = req.params;
      await database.Turmas.destroy({ where: { id: Number(id) } });
      return res
        .status(200)
        .json(`Turma de id: ${id} foi excluída com sucesso`);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restoreAClass(req, res) {
    try {
      const { id } = req.params;
      await database.Turmas.restore({ where: { id: Number(id) } });
      return res
        .status(200)
        .json(`Turma de id: ${id} foi restaurada com sucesso`);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TurmaController;
