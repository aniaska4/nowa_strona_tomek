const db = require('../config/database')

async function getContent(req, res) {
  try {
    const row = await db.getAsync('SELECT * FROM content WHERE key = ?', [req.params.key])
    res.json(row || { key: req.params.key, text: '' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function updateContent(req, res) {
  const text = req.body.text || ''
  try {
    await db.runAsync(
      `INSERT INTO content (key, text, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET text = excluded.text, updated_at = excluded.updated_at`,
      [req.params.key, text]
    )
    const row = await db.getAsync('SELECT * FROM content WHERE key = ?', [req.params.key])
    res.json(row)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getContent, updateContent }
