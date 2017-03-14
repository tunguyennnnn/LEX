const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')
const _ = require('lodash')


const VideoDetailSchema = new mongoose.Schema({
  video_id: {
    type: String,
    required: true
  },
  title: String,
  words_with_time: [{word: String,
                  time: {start_time: Number, stop_time: Number}
                  }],
  raw_transcript: String,

  processed_transcript: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
}, {collection: 'text_with_time'});


VideoDetailSchema.statics = {
  search({videoId, timeStamps} = {}){
    console.log("Dasdadasdasdadas");
    console.log(videoId)
    let timeSet = _.flatten(timeStamps.map(function(wwt){ return wwt.time}));
    let filterCondition = {$or : timeSet.map(function(time){
      return {'words_with_time.time.start_time': {$gt: time.start_time - 5.0, $lt: time.stop_time + 5.0}}
    })}
    console.log(videoId);
    console.log(filterCondition)
    return this.aggregate([
      {$match: {'video_id': videoId}},
      {$unwind: '$words_with_time'},
      {$match: filterCondition},
      {$group: {_id: {_id: "$_id", title: '$title', videoId: '$video_id'}, list: {$push: '$words_with_time'}}}
    ])
  }
}
module.exports = mongoose.model('VideoDetail', VideoDetailSchema);
