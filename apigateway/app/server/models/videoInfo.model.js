const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const VideoDetail = require('./videoDetail.model');

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

//VideoInfoSchema.index({name: 'text', 'processed_transcript': 'text'})

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
    console.log("dasdadadada")
    console.log(id);
    return this.findById(id)
      .exec()
      .then((video) => {
        console.log(video)
        if (video) {
          return video
        }
        // const err = new APIError('Video does not exist.', httpStatus.NOT_FOUND)
        // return Promise.reject(err)
      });


  },

  searchInVideo({id, q}){
    let words = q.split(' ');
    return this.aggregate(
      {$match: {_id: (new mongoose.Types.ObjectId(id))}},
      {$unwind: '$words_with_time'},
      {$match: {'words_with_time.word': {$in: q.split(' ')}}},
      {$group: {_id: '$video_id', timeStamps: {$push: '$words_with_time'}}}
    )
    .then(function(video){
      console.log(video);
      let videoId = video[0]._id;
      let timeStamps = video[0].timeStamps;
      return VideoDetail.search({videoId, timeStamps});
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
      let words = query.split(' ')
      return this.aggregate(
        {$match: {'words_with_time.word' : {$in: words}}},
        {$unwind: '$words_with_time'},
        {$match: {'words_with_time.word' : {$in: words}}},
        {$group: {_id: '$video_id', timeStamps: {$push: '$words_with_time'}}}
      )
      .limit(limit)
      .skip(skip)
      .then(function(videos){
        return Promise.map(videos, function(video){
          let videoId = video._id;
          let timeStamps = video.timeStamps;
          return VideoDetail.search({videoId, timeStamps});
        })
      })
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
