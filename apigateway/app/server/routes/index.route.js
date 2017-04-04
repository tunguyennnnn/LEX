const express = require('express')
const videoRoutes = require('./video.route')
const userRoute = require('./user.route')

const router = express.Router()

/** GET /health-check - Check service health */
router.post('/health-check', (req, res) => {
  console.log(req.body)
  res.send('OK')
})

// videos info routes
router.use('/videos', videoRoutes)

router.use('/users', userRoute)

module.exports = router
