const VideoInfo = require('../models/videoInfo.model');
/**
 * Get video list.
 * @property {number} req.query.skip - Number of videos to be skipped.
 * @property {number} req.query.limit - Limit number of videos to be returned.
 * @returns {Video[]}
 */


function validateLimit(query){
  let limit = parseInt(query.limit, 10);
  if (isNaN(limit)){
    limit = 10
  }else if (limit > 50 || limit < 1){
    limit = 10
  }
  return limit;
}

function validateSkip(query){
  let skip = parseInt(query.skip, 10);
  if (isNaN(skip) || skip < 0){
    skip = 0;
  }
  return skip
}
function list (req, res, next) {
  const limit = validateLimit(req.query);
  const skip = validateSkip(req.query);
  const query = req.query.q;
  VideoInfo.list({ limit, skip, query })
    .then(videos => res.json(videos))
    .catch(e => res.json(e))
}

function postVideo(req, res, next){
  console.log(req.body);
  var d;
  VideoInfo.find({}, function(err, data){
    if (err) console.log(error);
    res.json({message: data});
  });

}

function videoSearch(req, res, next){
  let id = req.params.video_id;
  let q = req.query.q;
  if (q){
    VideoInfo.searchInVideo({id, q})
    .then(videoInfo => res.json(videoInfo))
    .catch(e => res.json(e));
  }
  else{
    VideoInfo.get(id)
    .then(video => res.json(video));
  }

}

module.exports = { list, postVideo, videoSearch }
