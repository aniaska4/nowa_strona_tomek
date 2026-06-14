const jwt    = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db     = require('../config/database')

async function login(req, res) {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'Login i hasło są wymagane' })

  try {
    const admin = await db.getAsync('SELECT * FROM admins WHERE username = ?', [username])
    if (!admin) return res.status(401).json({ error: 'Nieprawidłowy login lub hasło' })

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) return res.status(401).json({ error: 'Nieprawidłowy login lub hasło' })

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'changeme-secret',
      { expiresIn: '7d' }
    )
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { login }
