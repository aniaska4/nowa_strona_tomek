const db = require('../config/database')

async function getVideos(_req, res) {
  try {
    const rows = await db.allAsync('SELECT * FROM videos ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function addVideo(req, res) {
  const { title, url, description } = req.body
  if (!title || !url) return res.status(400).json({ error: 'Pola title i url są wymagane' })
  try {
    const result = await db.runAsync(
      'INSERT INTO videos (title, url, description) VALUES (?, ?, ?)',
      [title, url, description || null]
    )
    const row = await db.getAsync('SELECT * FROM videos WHERE id = ?', [result.lastID])
    res.status(201).json(row)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function deleteVideo(req, res) {
  try {
    await db.runAsync('DELETE FROM videos WHERE id = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getVideos, addVideo, deleteVideo }
