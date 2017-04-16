const express = require('express')
const proxy = require('http-proxy-middleware')

const videoCtrl = require('../controllers/video.controller')
// const queueCtrl = require('../controllers/queue.controller')
const authCheck = require('../../config/auth')
const config = require('../../config/env')

// const logger = require('../../config/winston')

const openRouter = express.Router()

openRouter.route('/')
  .get(videoCtrl.list)

const authRouter = express.Router()

authRouter.all('*', authCheck)

authRouter.route('/')
  .post(videoCtrl.postVideo)

authRouter.route('/:video_id')
  .get(videoCtrl.videoSearch)

module.exports = {openRouter, authRouter}
