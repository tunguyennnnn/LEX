const express = require('express');
const videoCtrl = require('../controllers/video.controller')
const jwt = require('jsonwebtoken');
const router = express.Router();

router.use(function(req, res, next){
  console.log(req.headers)
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token){
    jwt.verify(token, "tusamjavier", function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        console.log(decoded);
        req.decoded = decoded;
        next();
      }
    });
  }
  else{
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

router.route('/')
  /** GET /api/videos - Get list of videos */
  .get(videoCtrl.list)
  .post(videoCtrl.postVideo)

router.route('/:video_id')
  .get(videoCtrl.videoSearch)

module.exports = router;
