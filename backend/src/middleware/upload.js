const multer = require('multer')
const path   = require('path')

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`
    cb(null, unique + path.extname(file.originalname))
  },
})

const fileFilter = (_req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/
  const ext     = allowed.test(path.extname(file.originalname).toLowerCase())
  const mime    = allowed.test(file.mimetype)
  cb(ext && mime ? null : new Error('Tylko pliki graficzne'), ext && mime)
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } })

module.exports = upload
