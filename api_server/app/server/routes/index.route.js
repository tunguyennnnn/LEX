const express = require('express')
const videoRoutes = require('./video.route')

const router = express.Router()

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
)

// mount user routes at /users
router.use('/video', videoRoutes)

module.exports = router
