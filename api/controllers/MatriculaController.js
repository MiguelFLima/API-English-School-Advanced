const database = require('../models');

class MatriculaController {
  static async getAllMatriculas(req, res) {
    try {
      const matriculas = await database.Matriculas.findAll();
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getAmatricula(req, res) {
    try {
      const { id } = req.params;
      const matricula = await database.Matriculas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(matricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = MatriculaController;
