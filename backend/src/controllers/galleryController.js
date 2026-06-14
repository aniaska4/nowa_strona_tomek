const db   = require('../config/database')
const path = require('path')
const fs   = require('fs')

async function getGallery(_req, res) {
  try {
    const rows = await db.allAsync('SELECT * FROM gallery ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function uploadPhoto(req, res) {
  if (!req.file) return res.status(400).json({ error: 'Brak pliku' })
  const caption = req.body.caption || null
  try {
    const result = await db.runAsync(
      'INSERT INTO gallery (filename, caption) VALUES (?, ?)',
      [req.file.filename, caption]
    )
    const row = await db.getAsync('SELECT * FROM gallery WHERE id = ?', [result.lastID])
    res.status(201).json(row)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function deletePhoto(req, res) {
  try {
    const row = await db.getAsync('SELECT * FROM gallery WHERE id = ?', [req.params.id])
    if (!row) return res.status(404).json({ error: 'Nie znaleziono' })
    await db.runAsync('DELETE FROM gallery WHERE id = ?', [req.params.id])
    const filePath = path.join(__dirname, '../../uploads', row.filename)
    fs.unlink(filePath, () => {})
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getGallery, uploadPhoto, deletePhoto }
