var mongoose = require('mongoose');

//generate Schema

var videoInfoSchema = mongoose.Schema({

})

var VideoInfo = module.exports = mongoose.model('VideoInfo', videoInfoSchema);

//get VideoInfo
module.exports.getVideoInfo = function(callback, limit){
	VideoInfo.find(callback).limit(limit);
}