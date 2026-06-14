const db = require('../config/database')

async function sendMessage(req, res) {
  const { name, email, subject, message } = req.body
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Wszystkie pola są wymagane' })
  }
  try {
    await db.runAsync(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function getMessages(_req, res) {
  try {
    const rows = await db.allAsync('SELECT * FROM messages ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { sendMessage, getMessages }
