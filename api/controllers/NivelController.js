const database = require('../models');

const Services = require('../services/Services');
const niveisServices = new Services('Niveis');

class NivelController {
  static async getAllLevels(req, res) {
    try {
      const levels = await niveisServices.getAllPeople();
      return res.status(200).json(levels);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getALevel(req, res) {
    try {
      const { id } = req.params;
      const level = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(level);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async uploadALevel(req, res) {
    try {
      const newLevelInfo = req.body;
      const newLevel = await database.Niveis.create(newLevelInfo);
      return res.status(201).json(newLevel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateALevel(req, res) {
    try {
      const { id } = req.params;
      const infoUpdated = req.body;
      await database.Niveis.update(infoUpdated, { where: { id: Number(id) } });
      const levelUpdated = await database.Niveis.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(levelUpdated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteALevel(req, res) {
    try {
      const { id } = req.params;
      await database.Niveis.destroy({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ message: `O nível de id: ${id} foi excluído ` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restoreALevel(req, res) {
    try {
      const { id } = req.params;
      await database.Niveis.restore({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({ message: `O nível de id: ${id} foi restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = NivelController;
