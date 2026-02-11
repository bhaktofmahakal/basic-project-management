const ProjectService = require('../services/projectService');

class ProjectController {
  static async create(req, res, next) {
    try {
      const project = await ProjectService.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const result = await ProjectService.getProjects(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const project = await ProjectService.getProjectById(req.params.id);
      res.json(project);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const project = await ProjectService.updateProjectStatus(req.params.id, req.body.status);
      res.json(project);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await ProjectService.deleteProject(req.params.id);
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProjectController;
