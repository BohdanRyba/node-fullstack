const express = require('express')
const controller = require('../app/http/controllers/analitics')
const router = express.Router()

router.get('/overview', controller.overview)
router.get('/analytics', controller.analytics)


module.exports = router