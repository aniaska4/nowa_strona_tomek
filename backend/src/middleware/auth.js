const jwt = require('jsonwebtoken')

function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Brak tokenu autoryzacji' })
  }
  const token = header.slice(7)
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'changeme-secret')
    next()
  } catch {
    res.status(401).json({ error: 'Nieprawidłowy token' })
  }
}

module.exports = { requireAuth }
