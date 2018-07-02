const express = require('express')
const controller = require('../app/http/controllers/order')
const router = express.Router()


router.get('/', controller.getAll)
router.post('/create', controller.createOrder)

module.exports = router