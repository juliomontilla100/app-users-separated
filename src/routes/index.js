const express = require('express')
const views = require('./views')
const users = require('./users')
const notes = require('./notes')

const router = express.Router()

router.use('/', views)
router.use('/users', users)
router.use('/notes', notes)

module.exports = router