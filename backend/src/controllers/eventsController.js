const db = require('../config/database')

async function getEvents(req, res) {
  const type  = req.query.type
  const today = new Date().toISOString().split('T')[0]
  try {
    let rows
    if (type === 'upcoming') {
      rows = await db.allAsync('SELECT * FROM events WHERE date >= ? ORDER BY date ASC', [today])
    } else if (type === 'archive') {
      rows = await db.allAsync('SELECT * FROM events WHERE date < ? ORDER BY date DESC', [today])
    } else {
      rows = await db.allAsync('SELECT * FROM events ORDER BY date DESC')
    }
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function createEvent(req, res) {
  const { title, date, venue, city, description, url } = req.body
  if (!title || !date || !venue) {
    return res.status(400).json({ error: 'Pola title, date i venue są wymagane' })
  }
  try {
    const result = await db.runAsync(
      'INSERT INTO events (title, date, venue, city, description, url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, date, venue, city || null, description || null, url || null]
    )
    const row = await db.getAsync('SELECT * FROM events WHERE id = ?', [result.lastID])
    res.status(201).json(row)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function updateEvent(req, res) {
  const { id } = req.params
  const { title, date, venue, city, description, url } = req.body
  try {
    await db.runAsync(
      'UPDATE events SET title=?, date=?, venue=?, city=?, description=?, url=? WHERE id=?',
      [title, date, venue, city || null, description || null, url || null, id]
    )
    const row = await db.getAsync('SELECT * FROM events WHERE id = ?', [id])
    if (!row) return res.status(404).json({ error: 'Nie znaleziono' })
    res.json(row)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function deleteEvent(req, res) {
  try {
    await db.runAsync('DELETE FROM events WHERE id = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getEvents, createEvent, updateEvent, deleteEvent }
