const express = require('express')
const videoCtrl = require('../controllers/video.controller')
const queueCtrl = require('../controllers/queue.controller')
const router = express.Router()
const authCheck = require('../../config/auth')

router.route('/')
  /** GET /api/videos - Get list of videos */
  .get(videoCtrl.list)
  .post(authCheck, videoCtrl.postVideo)

router.route('/:video_id')
  .all(authCheck)
  .get(videoCtrl.videoSearch)

router.route('/queue')
  .all(authCheck)
  .get(queueCtrl.progress)
  .post(queueCtrl.transcribeVideo)

module.exports = router
