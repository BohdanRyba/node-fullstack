const express = require('express')
const controller = require('../app/http/controllers/category')
const passport = require('passport')
const router = express.Router()


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllCategories)
router.get('/:id', controller.getById)
router.delete('/:id', controller.remove)
router.post('/create', controller.creteCategory)
router.patch('/:id/update', controller.update)

module.exports = router