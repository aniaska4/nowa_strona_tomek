const db    = require('../config/database')
const path  = require('path')
const fs    = require('fs')
const sharp = require('sharp')

const UPLOADS_DIR = path.join(__dirname, '../../uploads')

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

  const filename = `${Date.now()}-${Math.round(Math.random() * 1e6)}.jpg`
  const outPath  = path.join(UPLOADS_DIR, filename)

  try {
    // Resize do max 2000px (szerokość lub wysokość), konwertuj na JPEG jakość 85
    await sharp(req.file.buffer)
      .rotate()                          // zachowaj orientację z EXIF
      .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(outPath)

    const caption = req.body.caption || null
    const result  = await db.runAsync(
      'INSERT INTO gallery (filename, caption) VALUES (?, ?)',
      [filename, caption]
    )
    const row = await db.getAsync('SELECT * FROM gallery WHERE id = ?', [result.lastID])
    res.status(201).json(row)
  } catch (err) {
    // Usuń plik jeśli zapis do DB się nie powiódł
    fs.unlink(outPath, () => {})
    res.status(500).json({ error: err.message })
  }
}

async function deletePhoto(req, res) {
  try {
    const row = await db.getAsync('SELECT * FROM gallery WHERE id = ?', [req.params.id])
    if (!row) return res.status(404).json({ error: 'Nie znaleziono' })
    await db.runAsync('DELETE FROM gallery WHERE id = ?', [req.params.id])
    fs.unlink(path.join(UPLOADS_DIR, row.filename), () => {})
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getGallery, uploadPhoto, deletePhoto }
