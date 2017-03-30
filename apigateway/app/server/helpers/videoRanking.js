const _ = require('lodash');
const Promise = require('bluebird');


/*
expect score is object
*/

function normalizeScores(scores, smallIsBetter){
  const vsmall = 0.000001; //avoid zero vision
  let normalizedScores = {};
  if (smallIsBetter){
    let minScore = Math.min.apply(this, _.values(scores));
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


function constructAndGiveScore(arrayOfObjects, smallIsBetter){
  let constructedObjects = _.reduce(arrayOfObjects, function(acc, item){
    acc[item[0]] = item[1];
    return acc;
  }, {});
  return normalizeScores(constructedObjects, smallIsBetter)
}

function matchedWordsScore(searchResults){
  return Promise.map(searchResults, function(video){
    return [video._id, video.timeStamps.length]
  })
  .then(function(arrayOfObjects){
    return constructAndGiveScore(arrayOfObjects)
  })
}

function wordsFrequencyScore(searchedResults){
  return Promise.map(searchedResults, function(video){
    return [video._id,
            _.reduce(video.timeStamps, function(acc, item){

              acc += item.time.length;
              return acc}, 0)]
  })
  .then(function(arrayOfObjects){
    return constructAndGiveScore(arrayOfObjects)
  })
}

function wordDistanceScore(searchedResults){

}

function wordLocationScore(searchedResults){
  return Promise.map(searchedResults, function(video){
    let startTimes = video.timeStamps.map(function(wwt){
      return wwt.time[0].start_time;
    });
    return [video._id,
            startTimes.reduce(function(a,b){
              return a+b;
            },0)/startTimes.length]
  })
  .then(function(arrayOfObjects){
    return constructAndGiveScore(arrayOfObjects, true)
  })
}


function giveScores(searchedResults){
  return wordLocationScore(searchedResults)
    .then(function(locationScore){
      return wordsFrequencyScore(searchedResults)
        .then(function(frequencyScore){
          return matchedWordsScore(searchedResults)
            .then(function(wordCount){
              return Promise.map(searchedResults, function(video){
                return [video._id, frequencyScore[video._id] + 1.5*locationScore[video._id] + 2*wordCount[video._id]]
              })
            })
        })
    })
    .then(function(scoreArray){
      return _.reduce(scoreArray, function(acc, item){
        acc[item[0]] = item[1];
        return acc;
      }, {});
    })
}

module.exports = {giveScores};
