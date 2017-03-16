const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const VideoDetail = require('./videoDetail.model');
const lemmatize = Promise.promisify(require('lemmer').lemmatize);

//make connection:

/**
 * Video Info Schema
 */
const VideoInfoSchema = new mongoose.Schema({
  video_id: {
    type: String,
    required: true
  },

  words_with_time: [{word: String,
                  time: [{start_time: Number, stop_time: Number}]
                  }],
  title: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'compressedTWT' });


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
      });


  },

  searchInVideo({id, q}){
    let words = q.split(' ');
    let that = this;
    return lemmatize(words)
      .then(function(lemWords){
        return that.aggregate(
          {$match: {_id: (new mongoose.Types.ObjectId(id))}},
          {$unwind: '$words_with_time'},
          {$match: {'words_with_time.word': {$in: lemWords}}},
          {$group: {_id: '$video_id', timeStamps: {$push: '$words_with_time'}}}
        )
        .then(function(videos){
          if (videos.length > 0){
            let videoId = videos[0]._id;
            let timeStamps = videos[0].timeStamps;
            return VideoDetail.search({videoId, timeStamps, lemWords});
          }
          else{
            return {};
          }
        });
      })
  },
  /**
   * List videos in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of videos to be skipped.
   * @param {number} limit - Limit number of videos to be returned.
   * @returns {Promise}
   */
  list ({ skip = 0, limit = 20, query = undefined } = {}) {
    if (query && query !== ''){
      let that = this
      let words = query.split(' ')
      return lemmatize(words)
        .then(function(lemWords){
          return that.aggregate(
            {$match: {'words_with_time.word' : {$in: lemWords}}},
            {$unwind: '$words_with_time'},
            {$match: {'words_with_time.word' : {$in: lemWords}}},
            {$group: {_id: '$video_id', timeStamps: {$push: '$words_with_time'}}}
          )
          .then(function(videos){
            return Promise.map(videos, function(video){
              let videoId = video._id;
              let timeStamps = video.timeStamps;
              return VideoDetail.search({videoId, timeStamps, lemWords});
            })
          });
        });
    }
    else{
      return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec()
    }
  }
}

module.exports = mongoose.model('VideoInfo', VideoInfoSchema)
