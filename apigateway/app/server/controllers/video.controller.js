const VideoInfo = require('../models/videoInfo.model')
const mongoose = require('mongoose')

const logger = require('../../config/winston')
/**
 * Get video list.
 * @property {number} req.query.skip - Number of videos to be skipped.
 * @property {number} req.query.limit - Limit number of videos to be returned.
 * @returns {Video[]}
 */

function validateLimit (query) {
  let limit = parseInt(query.limit, 10)
  if (isNaN(limit)) {
    limit = 10
  } else if (limit > 50 || limit < 1) {
    limit = 10
  }
  return limit
}

function validateSkip (query) {
  let skip = parseInt(query.skip, 10)
  if (isNaN(skip) || skip < 0) {
    skip = 0
  }
  return skip
}
function list (req, res, next) {
  const limit = validateLimit(req.query)
  const skip = validateSkip(req.query)
  const query = req.query.q
  VideoInfo.list({ limit, skip, query })
    .then(videos => res.json(videos))
    .catch(e => res.json(e))
}

function postVideo (req, res, next) {
  VideoInfo.find({}, (err, data) => {
    if (err) logger.error(err)
    res.json({message: data})
  })
}

function videoSearch (req, res, next) {
  let id = req.params.video_id
  if (mongoose.Types.ObjectId.isValid(id)) {
    let q = req.query.q
    if (q) {
      VideoInfo.searchInVideo({id, q})
      .then(videoInfo => {
        res.status(200).json(videoInfo)
      })
      .catch((err) => {
        logger.error(err)
        res.status(500).send()
      })
    } else {
      VideoInfo.get(id)
      .then(video => {
        if (video) {
          res.status(200).json(video)
        } else {
          res.status(404).json({success: false, message: 'Invalid video id'})
        }
      })
      .catch(err => {
        logger.error(err)
        res.status(404)
      })
    }
  } else {
    res.status(404).json({success: false, message: 'Invalid video id'})
  }
}

module.exports = { list, postVideo, videoSearch }
