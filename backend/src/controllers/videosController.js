const db = require('../config/database')

async function getVideos(req, res) {
  try {
    const category = req.query.category || null
    const rows = category
      ? await db.allAsync('SELECT * FROM videos WHERE category = ? ORDER BY created_at DESC', [category])
      : await db.allAsync('SELECT * FROM videos WHERE category IS NULL ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function addVideo(req, res) {
  const { title, url, description, category } = req.body
  if (!title || !url) return res.status(400).json({ error: 'Pola title i url są wymagane' })
  try {
    const result = await db.runAsync(
      'INSERT INTO videos (title, url, description, category) VALUES (?, ?, ?, ?)',
      [title, url, description || null, category || null]
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
