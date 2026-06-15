const Database = require('better-sqlite3')
const path      = require('path')
const bcrypt    = require('bcryptjs')

const DB_PATH = path.join(__dirname, '../../database/pianist.db')

const db = new Database(DB_PATH)
console.log('Connected to SQLite database')

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`CREATE TABLE IF NOT EXISTS events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT    NOT NULL,
  date        TEXT    NOT NULL,
  venue       TEXT    NOT NULL,
  city        TEXT,
  description TEXT,
  url         TEXT,
  created_at  TEXT    DEFAULT (datetime('now'))
)`)

// Migration: add url column if missing (safe to run on existing DB)
try { db.exec(`ALTER TABLE events ADD COLUMN url TEXT`) } catch (_) {}

db.exec(`CREATE TABLE IF NOT EXISTS gallery (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  filename   TEXT    NOT NULL,
  caption    TEXT,
  created_at TEXT    DEFAULT (datetime('now'))
)`)

db.exec(`CREATE TABLE IF NOT EXISTS videos (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  url         TEXT NOT NULL,
  description TEXT,
  created_at  TEXT DEFAULT (datetime('now'))
)`)

db.exec(`CREATE TABLE IF NOT EXISTS messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
)`)

db.exec(`CREATE TABLE IF NOT EXISTS admins (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT    UNIQUE NOT NULL,
  password TEXT    NOT NULL
)`)

// Seed default admin if none exists
const existingAdmin = db.prepare('SELECT id FROM admins LIMIT 1').get()
if (!existingAdmin) {
  const hash = bcrypt.hashSync('admin123', 10)
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', hash)
  console.log('Default admin created — username: admin, password: admin123')
}

// Async-compatible helpers (better-sqlite3 is synchronous; wrap in resolved promises
// so all controllers can continue using await without modification).
// runAsync normalises the result to expose `lastID` (sqlite3 compat) alongside
// better-sqlite3's native `lastInsertRowid`.
db.getAsync = (sql, params = []) => Promise.resolve(db.prepare(sql).get(params))
db.allAsync = (sql, params = []) => Promise.resolve(db.prepare(sql).all(params))
db.runAsync = (sql, params = []) => {
  const result = db.prepare(sql).run(params)
  result.lastID = result.lastInsertRowid
  return Promise.resolve(result)
}

module.exports = db
