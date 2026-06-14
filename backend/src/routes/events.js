const router = require('express').Router()
const ctrl   = require('../controllers/eventsController')
const { requireAuth } = require('../middleware/auth')

router.get('/',     ctrl.getEvents)
router.post('/',    requireAuth, ctrl.createEvent)
router.put('/:id',  requireAuth, ctrl.updateEvent)
router.delete('/:id', requireAuth, ctrl.deleteEvent)

module.exports = router
