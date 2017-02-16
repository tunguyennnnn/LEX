const express = require('express')
const videoCtrl = require('../controllers/video.controller')

const router = express.Router()

router.route('/')
  /** GET /api/videos - Get list of videos */
  .get(videoCtrl.list)

module.exports = router
