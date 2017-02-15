const VideoInfo = require('../models/videoInfo.model')

/**
 * Get video list.
 * @property {number} req.query.skip - Number of videos to be skipped.
 * @property {number} req.query.limit - Limit number of videos to be returned.
 * @returns {Video[]}
 */
function list (req, res, next) {
  const { limit = 50, skip = 0 } = req.query
  VideoInfo.list({ limit, skip })
    .then(videos => res.json(videos))
    .catch(e => next(e))
}

module.exports = { list }
