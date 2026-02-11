const Project = require('../models/Project');

const STATUS_TRANSITIONS = {
  active: ['on_hold', 'completed'],
  on_hold: ['active', 'completed'],
  completed: []
};

class ProjectService {
  static createProject(data) {
    return Project.create(data);
  }

  static getProjects(query) {
    return Project.findAll(query);
  }

  static getProjectById(id) {
    const project = Project.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  static updateProjectStatus(id, newStatus) {
    const project = Project.findById(id);
    
    if (!project) {
      throw new Error('Project not found');
    }

    const allowedTransitions = STATUS_TRANSITIONS[project.status] || [];
    
    if (!allowedTransitions.includes(newStatus)) {
      throw new Error(
        `Invalid status transition: cannot change from "${project.status}" to "${newStatus}". ` +
        `Allowed transitions: ${allowedTransitions.length > 0 ? allowedTransitions.join(', ') : 'none'}`
      );
    }

    return Project.updateStatus(id, newStatus);
  }

  static deleteProject(id) {
    const project = Project.findById(id);
    
    if (!project) {
      throw new Error('Project not found');
    }

    const deleted = Project.softDelete(id);
    return deleted;
  }
}

module.exports = ProjectService;
