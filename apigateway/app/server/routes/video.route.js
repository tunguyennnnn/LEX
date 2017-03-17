const express = require('express')
const videoCtrl = require('../controllers/video.controller')
const router = express.Router()
const authCheck = require('../../config/auth')

router.route('/')
  /** GET /api/videos - Get list of videos */
  .get(videoCtrl.list)
  .post(authCheck, videoCtrl.postVideo)

router.route('/:video_id')
  .all(authCheck)
  .get(videoCtrl.videoSearch)

module.exports = router
