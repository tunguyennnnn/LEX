var express = require('express');
var app  = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

VideoInfo = require('./models/VideoInfo');
mongoose.connect('mongodb://localhost/api_server');
var db = mongoose.connection;


app.get('/', function(req, res){
	res.send('hello_worldasd asdd')
});

app.get('/api', function(req, res){
});
app.listen(4000);

console.log('Running on part 4000');