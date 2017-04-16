const express = require('express')
const videoRoutes = require('./video.route')
const userRoutes = require('./user.route')
const queueRoutes = require('./queue.route')

const router = express.Router()

/** GET /health-check - Check service health */
router.post('/health-check', (req, res) => {
  console.log(req.body)
  res.send('OK')
})

// videos info routes
router.use('/videos', videoRoutes.openRouter)
router.use('/videos', videoRoutes.authRouter)

router.use('/queue', queueRoutes)

router.use('/users', userRoutes)

module.exports = router
