const sqlite3 = require('sqlite3').verbose()
const path    = require('path')
const bcrypt  = require('bcryptjs')

const DB_PATH = path.join(__dirname, '../../database/pianist.db')

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error('DB error:', err.message)
  else console.log('Connected to SQLite database')
})

db.serialize(() => {
  db.run('PRAGMA journal_mode = WAL')
  db.run('PRAGMA foreign_keys = ON')

  db.run(`CREATE TABLE IF NOT EXISTS events (
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
  db.run(`ALTER TABLE events ADD COLUMN url TEXT`, () => {})

  db.run(`CREATE TABLE IF NOT EXISTS gallery (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    filename   TEXT    NOT NULL,
    caption    TEXT,
    created_at TEXT    DEFAULT (datetime('now'))
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS videos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    url         TEXT NOT NULL,
    description TEXT,
    created_at  TEXT DEFAULT (datetime('now'))
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    subject    TEXT NOT NULL,
    message    TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS admins (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT    UNIQUE NOT NULL,
    password TEXT    NOT NULL
  )`)

  // Seed default admin if none exists
  db.get('SELECT id FROM admins LIMIT 1', (err, row) => {
    if (!row) {
      const hash = bcrypt.hashSync('admin123', 10)
      db.run('INSERT INTO admins (username, password) VALUES (?, ?)', ['admin', hash])
      console.log('Default admin created — username: admin, password: admin123')
    }
  })
})

// Promisify helpers
db.getAsync  = (sql, params = []) => new Promise((res, rej) => db.get(sql, params, (e, r) => e ? rej(e) : res(r)))
db.allAsync  = (sql, params = []) => new Promise((res, rej) => db.all(sql, params, (e, r) => e ? rej(e) : res(r)))
db.runAsync  = (sql, params = []) => new Promise((res, rej) => db.run(sql, params, function(e) { e ? rej(e) : res(this) }))

module.exports = db
