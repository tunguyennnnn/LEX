const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')

//make connection:

/**
 * Video Info Schema
 */
const VideoInfoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true
  },

  words_with_time: [{word: String,
                  time: {start_time: Number, stop_time: Number}
                  }],
  raw_transcript: String,

  processed_transcript: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'text_with_time' });

/**
 * Methods : defined on the document (instance)
 */
// VideoInfoSchema.methods.foo
// VideoInfoSchema.methods.bar

/**
 * Statics : methods defined on the Model
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
      });


},

  /**
   * List videos in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of videos to be skipped.
   * @param {number} limit - Limit number of videos to be returned.
   * @returns {Promise}
   */
  // list ({ skip = 0, limit = 50 } = {}) {
  //   return this.find()
  //     .sort({ createdAt: -1 })
  //     .skip(skip)
  //     .limit(limit)
  //     .exec()
  // }
}

module.exports = mongoose.model('VideoInfo', VideoInfoSchema)
