const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../../database/projects.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    clientName TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('active', 'on_hold', 'completed')),
    priority TEXT NOT NULL CHECK(priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    startDate TEXT NOT NULL,
    endDate TEXT,
    notes TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    deletedAt TEXT
  )
`);

db.exec(`CREATE INDEX IF NOT EXISTS idx_status ON projects(status)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_deletedAt ON projects(deletedAt)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_name ON projects(name)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_clientName ON projects(clientName)`);

module.exports = db;
