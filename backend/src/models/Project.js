const db = require('../config/database');

class Project {
  static create(data) {
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO projects (name, clientName, status, priority, startDate, endDate, notes, createdAt, updatedAt)
      VALUES (@name, @clientName, @status, @priority, @startDate, @endDate, @notes, @createdAt, @updatedAt)
    `);
    
    const result = stmt.run({
      name: data.name,
      clientName: data.clientName,
      status: data.status,
      priority: data.priority || 'medium',
      startDate: data.startDate,
      endDate: data.endDate || null,
      notes: data.notes || null,
      createdAt: now,
      updatedAt: now
    });
    
    return this.findById(result.lastInsertRowid);
  }

  static findAll(filters = {}) {
    let query = 'SELECT * FROM projects WHERE deletedAt IS NULL';
    const params = {};

    if (filters.status) {
      query += ' AND status = @status';
      params.status = filters.status;
    }

    if (filters.search) {
      query += ' AND (name LIKE @search OR clientName LIKE @search)';
      params.search = `%${filters.search}%`;
    }

    const allowedSortColumns = ['createdAt', 'startDate', 'name', 'updatedAt'];
    const sortBy = allowedSortColumns.includes(filters.sortBy) ? filters.sortBy : 'createdAt';
    const sortOrder = (filters.sortOrder || 'desc').toLowerCase() === 'asc' ? 'ASC' : 'DESC';
    query += ` ORDER BY ${sortBy} ${sortOrder}`;

    const page = Math.max(1, parseInt(filters.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(filters.limit) || 10));
    const offset = (page - 1) * limit;

    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
    const totalResult = db.prepare(countQuery).get(params);
    const total = totalResult.total;

    query += ' LIMIT @limit OFFSET @offset';
    params.limit = limit;
    params.offset = offset;

    const projects = db.prepare(query).all(params);

    return {
      projects,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM projects WHERE id = ? AND deletedAt IS NULL');
    return stmt.get(id);
  }

  static updateStatus(id, newStatus) {
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      UPDATE projects 
      SET status = @status, updatedAt = @updatedAt
      WHERE id = @id AND deletedAt IS NULL
    `);
    
    const result = stmt.run({ id, status: newStatus, updatedAt: now });
    
    if (result.changes === 0) {
      return null;
    }
    
    return this.findById(id);
  }

  static softDelete(id) {
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      UPDATE projects 
      SET deletedAt = @deletedAt
      WHERE id = @id AND deletedAt IS NULL
    `);
    
    const result = stmt.run({ id, deletedAt: now });
    return result.changes > 0;
  }
}

module.exports = Project;
