const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')

/**
 * Video Info Schema
 */
const VideoInfoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * Methods
 */
VideoInfoSchema.method({
})

/**
 * Statics
 */
VideoInfoSchema.statics = {
  /**
   * Get video
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise}
   */
  get (id) {
    return this.findById(id)
      .exec()
      .then((video) => {
        if (video) {
          return video
        }
        const err = new APIError('Video does not exist.', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  },

  /**
   * List videos in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of videos to be skipped.
   * @param {number} limit - Limit number of videos to be returned.
   * @returns {Promise}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec()
  }
}

module.exports = mongoose.model('User', VideoInfoSchema)
