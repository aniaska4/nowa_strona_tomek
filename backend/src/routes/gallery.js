const router = require('express').Router()
const ctrl   = require('../controllers/galleryController')
const { requireAuth } = require('../middleware/auth')
const upload = require('../middleware/upload')

router.get('/',       ctrl.getGallery)
router.post('/',      requireAuth, upload.single('photo'), ctrl.uploadPhoto)
router.delete('/:id', requireAuth, ctrl.deletePhoto)

module.exports = router
