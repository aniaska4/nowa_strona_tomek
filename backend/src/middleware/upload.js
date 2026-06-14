const multer = require('multer')
const path   = require('path')

const fileFilter = (_req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/
  const ext     = allowed.test(path.extname(file.originalname).toLowerCase())
  const mime    = allowed.test(file.mimetype)
  if (ext && mime) {
    cb(null, true)
  } else {
    cb(new Error('Tylko pliki graficzne (jpeg, jpg, png, gif, webp)'))
  }
}

// memoryStorage — plik ląduje w buforze, sharp przetwarza przed zapisem na dysk
const upload = multer({
  storage:    multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
})

module.exports = upload
