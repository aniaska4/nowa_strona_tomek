const router = require('express').Router()
const ctrl   = require('../controllers/videosController')
const { requireAuth } = require('../middleware/auth')

router.get('/',       ctrl.getVideos)
router.post('/',      requireAuth, ctrl.addVideo)
router.delete('/:id', requireAuth, ctrl.deleteVideo)

module.exports = router
