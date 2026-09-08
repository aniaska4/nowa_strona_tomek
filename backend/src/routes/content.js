const router = require('express').Router()
const ctrl   = require('../controllers/contentController')
const { requireAuth } = require('../middleware/auth')

router.get('/:key', ctrl.getContent)
router.put('/:key', requireAuth, ctrl.updateContent)

module.exports = router
