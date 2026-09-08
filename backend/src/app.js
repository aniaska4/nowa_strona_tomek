require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const path    = require('path')

const app = express()

// Accept both the apex and www variant of CLIENT_ORIGIN - shared hosting
// (OVH) serves the site under both, and a mismatch here silently breaks
// every cross-origin fetch/XHR (CORS), even though plain navigation still
// works, since the browser only enforces CORS on script-driven requests.
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
const apexOrigin    = clientOrigin.replace('://www.', '://')
const allowedOrigins = [apexOrigin, apexOrigin.replace('://', '://www.')]

app.use(cors({ origin: allowedOrigins }))
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
app.use('/api/content', require('./routes/content'))

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
const server = app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))

// Railway/proxy keep-alive timeout jest zwykle 60s; domyślny Node (5s) zrywa
// połączenie za wcześnie i proxy zgłasza to jako błąd (np. HTTP2_PROTOCOL_ERROR)
server.keepAliveTimeout = 65000
server.headersTimeout   = 66000
