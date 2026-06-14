const router = require('express').Router()
const ctrl   = require('../controllers/contactController')
const { requireAuth } = require('../middleware/auth')

router.post('/',  ctrl.sendMessage)
router.get('/',   requireAuth, ctrl.getMessages)

module.exports = router
