const _ = require('lodash');
const Promise = require('bluebird');


/*
expect score is object
*/

function normalizeScores(scores, smallIsBetter){
  const vsmall = 0.000001; //avoid zero vision
  let normalizedScores = {};
  if (smallIsBetter){
    let minScore = Max.min.apply(this, _.values(scores));
    _.each(scores, function(val, key){
      normalizedScores[key] = minScore/Math.max(val, vsmall)
    })
  }
  else{
    let maxScore = Math.max.apply(this, _.values(scores));
    if (maxScore == 0) maxScore = vsmall;
    _.each(scores, function(val, key){
      normalizedScores[key] = val/maxScore;
    })
  }
  return normalizedScores
}


function matchedWordsScore(searchResults){
  return Promise.map(searchResults, function(video){
    return [video._id._id, video.timeStamps.length]
  })
  .then(function(arrayOfObjects){
    return _.reduce(arrayOfObjects, function(acc, item){
      acc[item[0]] = item[1];
      return acc
    }, {});
  })
  .then(function(scores){
    return normalizeScores(scores)
  })
}

function wordsFrequencyScore(searchedResults){
  return Promise.map(searchedResults, function(video){
    return [video._id._id,
            _.reduce(video.timeStamps, function(acc, item){

              acc += item.time.length;
              return acc}, 0)]
  })
  .then(function(arrayOfObjects){
    return _.reduce(arrayOfObjects, function(acc, item){
      acc[item[0]] = item[1];
      return acc
    }, {});
  })
  .then(function(scores){
    return normalizeScores(scores)
  })
}
module.exports = {matchedWordsScore, wordsFrequencyScore};
