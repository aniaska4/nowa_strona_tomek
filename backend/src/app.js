require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const path    = require('path')

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Routes
app.use('/api/auth',    require('./routes/auth'))
app.use('/api/events',  require('./routes/events'))
app.use('/api/gallery', require('./routes/gallery'))
app.use('/api/videos',  require('./routes/videos'))
app.use('/api/contact', require('./routes/contact'))

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Global error handler (catches multer errors, auth errors, etc.)
app.use((err, req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'Plik jest za duży (max 25 MB)' })
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({ error: 'Nieoczekiwane pole pliku' })
  }
  console.error('Server error:', err.message)
  res.status(err.status || 500).json({ error: err.message || 'Błąd serwera' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))
