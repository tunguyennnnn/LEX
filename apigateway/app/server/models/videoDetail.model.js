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
  summary: {type: String, default: ''},
  duration: {
    type: Number,
    default: 0,
    required: true
  },
  thumbnail: {
    type: String,
    default: 'http://az616578.vo.msecnd.net/files/2016/11/13/6361460020890849442046786068_beautiful-08.jpg'
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
}, {collection: 'text_with_time'})

// helper function for grouping words:

function inTimeRange (firstTimePoint, secondTimePoint, tollerance) {
  tollerance = tollerance || 1
  return (Math.ceil(firstTimePoint) + tollerance >= Math.ceil(secondTimePoint))
}

function groupWords (listWords, searchedWords) {
  searchedWords = searchedWords || []
  let groupedWords = []
  let currentWord = listWords[0]
  let currentObject = {context: currentWord.orginal_word, words: []}
  listWords.slice(1).forEach((word, index) => {
    if (!inTimeRange(currentWord.time.stop_time, word.time.start_time)) {
      groupedWords.push(currentObject)
      currentWord = word
      currentObject = {context: currentWord.orginal_word, words: []}
    } else {
      currentWord = word
      if (searchedWords.includes(currentWord.word)) {
        currentObject.words.push({word: currentWord.word, time: Math.floor(currentWord.time.start_time)})
      }
      currentObject.context += ' ' + currentWord.orginal_word
    }
  })
  groupedWords.push(currentObject)
  return groupedWords
}

VideoDetailSchema.statics = {
  search ({videoId, timeStamps, lemWords} = {}) {
    const timeSet = _.flatten(timeStamps.map((wwt) => wwt.time))
    const filterCondition = {$or: timeSet.map((time) => {
      return {'words_with_time.time.start_time': {$gt: time.start_time - 5.0, $lt: time.stop_time + 5.0}}
    })}
    return this.aggregate([
      {$match: {'video_id': videoId}},
      {$unwind: '$words_with_time'},
      {$match: filterCondition},
      {$group: {_id: {_id: '$_id', thumbnail: '$thumbnail', duration: '$duration', title: '$title', video_id: '$video_id'}, list: {$push: '$words_with_time'}}}
    ])
    .then((videos) => {
      const video = videos[0]
      const list = groupWords(video.list, lemWords)
      const {_id, title, thumbnail, duration, video_id} = video._id
      return {_id, title, thumbnail, duration, video_id, list}
    })
  }
}
module.exports = mongoose.model('VideoDetail', VideoDetailSchema)
