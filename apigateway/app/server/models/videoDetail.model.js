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

// helper function for grouping words:

function inTimeRange(firstTimePoint, secondTimePoint, tollerance){
  tollerance = tollerance || 1;
  if (Math.ceil(firstTimePoint) + tollerance >= Math.ceil(secondTimePoint))
    return true;
  return false;
}

function groupWords(listWords, searchedWords){
  searchedWords = searchedWords || [];
  let groupedWords = [];
  let currentWord = listWords[0];
  let currentObject = {context: currentWord.orginal_word, words:[]};
  listWords.slice(1).forEach(function(word, index){
    if (!inTimeRange(currentWord.time.stop_time, word.time.start_time)){
      groupedWords.push(currentObject);
      currentWord = word;
      currentObject = {context: currentWord.orginal_word, words:[]};
    }
    else{
      currentWord = word;
      if (searchedWords.includes(currentWord.word)){
        currentObject.words.push({word: currentWord.word, time: Math.floor(currentWord.time.start_time)});
      }
      currentObject.context += ' ' + currentWord.orginal_word;
    }
  });
  groupedWords.push(currentObject);
  return groupedWords;
}


VideoDetailSchema.statics = {
  search({videoId, timeStamps, lemWords} = {}){
    let timeSet = _.flatten(timeStamps.map(function(wwt){ return wwt.time}));
    let filterCondition = {$or : timeSet.map(function(time){
      return {'words_with_time.time.start_time': {$gt: time.start_time - 5.0, $lt: time.stop_time + 5.0}}
    })}
    return this.aggregate([
      {$match: {'video_id': videoId}},
      {$unwind: '$words_with_time'},
      {$match: filterCondition},
      {$group: {_id: {_id: "$_id", title: '$title', videoId: '$video_id'}, list: {$push: '$words_with_time'}}}
    ])
    .then(function(videos){
      let video = videos[0];
      video.list = groupWords(video.list, lemWords);
      return video;
    })
  }
}
module.exports = mongoose.model('VideoDetail', VideoDetailSchema);
