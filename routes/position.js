const express = require('express')
const controller = require('../app/http/controllers/position')
const router = express.Router()

router.get('/:categoryId', controller.getByCategoryId)
router.post('/create', controller.createOrder)
router.patch('/:id/update', controller.update)
router.delete('/remove', controller.remove)


module.exports = router